#!/usr/bin/env node
/**
 * clickup/sync.js
 * Sincroniza tarefas-30-dias.csv com as listas existentes na pasta Courchevel:
 *   - Cria campos customizados (Empreendimento, Prazo NYO, Prazo cliente) se não existirem
 *   - Adiciona tarefas que estão no CSV mas não estão no ClickUp
 *   - Atualiza status, empreendimento e prazos das tarefas existentes
 *
 * Uso: npm run clickup:sync
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

const FIELD_DEFS = [
  {
    name: "Empreendimento",
    type: "drop_down",
    type_config: {
      options: [
        { name: "Allure" },
        { name: "Triunfo" },
        { name: "Courchevelinc" },
        { name: "Novo Premium" },
        { name: "Chevalier" },
        { name: "Cross" },
        { name: "N/A" },
      ],
    },
  },
  { name: "Prazo NYO", type: "text" },
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

async function ensureFields(listId) {
  const { fields: existing } = await api("GET", `/list/${listId}/field`);
  const fieldMap = {};

  for (const def of FIELD_DEFS) {
    let field = existing.find(f => f.name === def.name);
    if (!field) {
      field = await api("POST", `/list/${listId}/field`, def);
      process.stdout.write(`+`);
    }
    const optionMap = {};
    for (const opt of field.type_config?.options || []) {
      optionMap[opt.name] = opt.orderindex;
    }
    fieldMap[def.name] = { id: field.id, options: optionMap };
  }

  return fieldMap;
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

function buildCustomFields(fieldMap, csvTask) {
  const fields = [];

  const emp = csvTask["Empreendimento"];
  if (emp && emp !== "N/A" && fieldMap["Empreendimento"]) {
    const orderindex = fieldMap["Empreendimento"].options[emp];
    if (orderindex !== undefined) fields.push({ id: fieldMap["Empreendimento"].id, value: orderindex });
  }

  const prazoNyo = csvTask["Quando dispara"];
  if (prazoNyo && prazoNyo !== "N/A" && fieldMap["Prazo NYO"]) {
    fields.push({ id: fieldMap["Prazo NYO"].id, value: prazoNyo });
  }

  return fields;
}

async function main() {
  console.log("=== Sync ClickUp · Projeto Courchevel ===\n");

  const csvPath = path.join(__dirname, "tarefas-30-dias.csv");
  if (!fs.existsSync(csvPath)) {
    console.error("ERRO: clickup/tarefas-30-dias.csv não encontrado.");
    process.exit(1);
  }

  const csvTasks = parseCSV(fs.readFileSync(csvPath, "utf8"));
  console.log(`${csvTasks.length} tarefas no CSV\n`);

  const { lists } = await api("GET", `/folder/${FOLDER_ID}/list?archived=false`);
  console.log(`Listas: ${lists.map(l => l.name).join(", ")}\n`);

  const listByName = {};
  for (const l of lists) listByName[l.name.toLowerCase().trim()] = l;

  let created = 0, updated = 0, erros = 0;

  for (const list of lists) {
    const csvForList = csvTasks.filter(t => t["Lista"].toLowerCase().trim() === list.name.toLowerCase().trim());
    if (!csvForList.length) continue;

    console.log(`\n[${list.name}] ${csvForList.length} tarefas no CSV`);

    process.stdout.write("  Campos: ");
    const fieldMap = await ensureFields(list.id);
    console.log(" OK");

    const clickupTasks = await getTasksFromList(list.id);
    const clickupByName = {};
    for (const t of clickupTasks) clickupByName[t.name.toLowerCase().trim()] = t;

    console.log(`  ${clickupTasks.length} tarefas no ClickUp`);

    // Tarefas faltando
    const missing = csvForList.filter(t => !clickupByName[t["Nome da tarefa"].toLowerCase().trim()]);
    if (missing.length) console.log(`  ${missing.length} tarefas faltando → criando...`);

    for (const csvTask of csvForList) {
      const key = csvTask["Nome da tarefa"].toLowerCase().trim();
      const customFields = buildCustomFields(fieldMap, csvTask);

      if (!clickupByName[key]) {
        // Criar tarefa
        try {
          await api("POST", `/list/${list.id}/task`, {
            name:          csvTask["Nome da tarefa"],
            description:   csvTask["Descrição"] || "",
            status:        csvTask["Status"],
            custom_fields: customFields,
          });
          process.stdout.write("C");
          created++;
        } catch (err) {
          console.error(`\n  ERRO ao criar "${csvTask["Nome da tarefa"]}": ${err.message}`);
          erros++;
        }
      } else {
        // Atualizar tarefa existente
        const existing = clickupByName[key];
        try {
          // Atualiza status
          await api("PUT", `/task/${existing.id}`, { status: csvTask["Status"] });

          // Atualiza campos customizados
          for (const field of customFields) {
            await api("POST", `/task/${existing.id}/field/${field.id}`, { value: field.value });
          }

          process.stdout.write(".");
          updated++;
        } catch (err) {
          console.error(`\n  ERRO ao atualizar "${csvTask["Nome da tarefa"]}": ${err.message}`);
          erros++;
        }
      }
    }
    console.log("");
  }

  console.log(`\nConcluído.`);
  console.log(`  C = criada (${created}) · . = atualizada (${updated}) · erros (${erros})`);
}

main().catch(err => { console.error("\nERRO:", err.message); process.exit(1); });
