#!/usr/bin/env node
/**
 * clickup/add-empreendimento.js
 * 1. Cria campo "Empreendimento" (dropdown) em todas as listas da pasta Courchevel
 * 2. Lê tarefas-30-dias.csv e atualiza cada tarefa existente com o empreendimento correto
 *
 * Uso: npm run clickup:empreendimento
 */

require("dotenv").config();

const fs   = require("fs");
const path = require("path");

const TOKEN     = process.env.CLICKUP_TOKEN;
const FOLDER_ID = "901318270784";

if (!TOKEN) {
  console.error("ERRO: CLICKUP_TOKEN não encontrado no .env");
  process.exit(1);
}

const BASE = "https://api.clickup.com/api/v2";

async function api(method, endpoint, body) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method,
    headers: { Authorization: TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${endpoint} → ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

const EMPREENDIMENTO_OPTIONS = [
  { name: "Allure" },
  { name: "Triunfo" },
  { name: "Courchevelinc" },
  { name: "Novo Premium" },
  { name: "Chevalier" },
  { name: "Cross" },
  { name: "N/A" },
];

function parseCSV(content) {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const values = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === "," && !inQ) { values.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    values.push(cur.trim());
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] || "").trim()]));
  });
}

async function ensureField(listId) {
  const { fields } = await api("GET", `/list/${listId}/field`);
  const existing = fields.find(f => f.name === "Empreendimento");
  if (existing) {
    const optionMap = {};
    for (const opt of existing.type_config?.options || []) {
      optionMap[opt.name] = opt.orderindex;
    }
    return { fieldId: existing.id, optionMap };
  }

  const created = await api("POST", `/list/${listId}/field`, {
    name: "Empreendimento",
    type: "drop_down",
    type_config: { options: EMPREENDIMENTO_OPTIONS },
  });

  const optionMap = {};
  for (const opt of created.type_config?.options || []) {
    optionMap[opt.name] = opt.orderindex;
  }
  return { fieldId: created.id, optionMap };
}

async function getTasksFromList(listId) {
  const tasks = [];
  let page = 0;
  while (true) {
    const res = await api("GET", `/list/${listId}/task?page=${page}&include_closed=true`);
    tasks.push(...res.tasks);
    if (res.last_page) break;
    page++;
  }
  return tasks;
}

async function main() {
  console.log("=== Empreendimento · Projeto Courchevel ===\n");

  const csvPath = path.join(__dirname, "tarefas-30-dias.csv");
  if (!fs.existsSync(csvPath)) {
    console.error("ERRO: clickup/tarefas-30-dias.csv não encontrado.");
    process.exit(1);
  }

  const csvTasks = parseCSV(fs.readFileSync(csvPath, "utf8"));
  const csvMap = {};
  for (const t of csvTasks) {
    csvMap[t["Nome da tarefa"].toLowerCase().trim()] = t["Empreendimento"];
  }
  console.log(`${csvTasks.length} tarefas no CSV\n`);

  const { lists } = await api("GET", `/folder/${FOLDER_ID}/list?archived=false`);
  console.log(`Listas encontradas: ${lists.map(l => l.name).join(", ")}\n`);

  let updated = 0, notFound = 0, skipped = 0;

  for (const list of lists) {
    console.log(`\n[${list.name}]`);

    const { fieldId, optionMap } = await ensureField(list.id);
    console.log(`  Campo Empreendimento: OK (id: ${fieldId})`);

    const tasks = await getTasksFromList(list.id);
    console.log(`  ${tasks.length} tarefas`);

    for (const task of tasks) {
      const key = task.name.toLowerCase().trim();
      const empreendimento = csvMap[key];

      if (!empreendimento || empreendimento === "N/A") {
        skipped++;
        continue;
      }

      const orderindex = optionMap[empreendimento];
      if (orderindex === undefined) {
        console.warn(`  AVISO: opção "${empreendimento}" não encontrada no campo (tarefa: ${task.name})`);
        notFound++;
        continue;
      }

      try {
        await api("POST", `/task/${task.id}/field/${fieldId}`, { value: orderindex });
        process.stdout.write(".");
        updated++;
      } catch (err) {
        console.error(`\n  ERRO em "${task.name}": ${err.message}`);
        notFound++;
      }
    }
    console.log("");
  }

  console.log(`\nConcluído. ${updated} tarefas atualizadas, ${skipped} sem empreendimento, ${notFound} erros/não encontrados.`);
}

main().catch(err => { console.error("\nERRO:", err.message); process.exit(1); });
