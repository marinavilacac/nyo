#!/usr/bin/env node
/**
 * clickup/sync.js
 * Fonte: clickup/data/{brand,trafego,tech,social}.csv
 * - Cria campo Empreendimento em todas as listas se não existir
 * - Cria tarefas faltando
 * - Atualiza empreendimento, status e due_date (prazo_dashboard - 2 dias)
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

// setor no CSV → nome da lista no ClickUp
const LIST_MAP = {
  brand:   "Brand",
  trafego: "Tráfego",
  tech:    "Tech",
  social:  "Social Media",
};

// CSV files por setor
const CSV_FILES = {
  brand:   path.join(__dirname, "data/brand.csv"),
  trafego: path.join(__dirname, "data/trafego.csv"),
  tech:    path.join(__dirname, "data/tech.csv"),
  social:  path.join(__dirname, "data/social.csv"),
};

// Empreendimento CSV → opção no campo ClickUp
const EMP_MAP = {
  "Cross":      "Cross",
  "Triunfo":    "Triunfo",
  "Allure":     "Allure",
  "Courchevel": "Courchevelinc",
  "Premium":    "Novo Premium",
  "Chevalier":  "Chevalier",
};

const EMPREENDIMENTO_DEF = {
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
};

function parseCSV(content) {
  const lines = content.trim().split("\n");
  // linha 0: título, linha 1: descrição, linha 2: headers
  const headers = lines[2].split(",").map(h => h.trim());
  return lines.slice(3).map(line => {
    const values = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === "," && !inQ) { values.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    values.push(cur.trim());
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] || "").trim()]));
  });
}

// prazo_dashboard (YYYY-MM-DD) - 2 dias → Unix ms para ClickUp
function toDueDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T12:00:00Z");
  if (isNaN(d)) return null;
  d.setDate(d.getDate() - 2);
  return d.getTime();
}

async function ensureEmpreendimentoField(listId) {
  const { fields } = await api("GET", `/list/${listId}/field`);
  let field = fields.find(f => f.name === "Empreendimento");
  if (!field) {
    field = await api("POST", `/list/${listId}/field`, EMPREENDIMENTO_DEF);
    process.stdout.write(" +campo");
  }
  const options = {};
  for (const opt of field.type_config?.options || []) {
    options[opt.name] = opt.id;
  }
  return { id: field.id, options };
}

async function getListStatuses(listId) {
  const list = await api("GET", `/list/${listId}`);
  const map = {};
  for (const s of list.statuses || []) {
    map[s.status.toLowerCase().trim()] = s.status;
  }
  return map;
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
  console.log("=== Sync ClickUp · Projeto Courchevel ===\n");

  // Carrega todos os CSVs
  const allTasks = {};
  for (const [setor, file] of Object.entries(CSV_FILES)) {
    if (!fs.existsSync(file)) { console.warn(`AVISO: ${file} não encontrado`); continue; }
    allTasks[setor] = parseCSV(fs.readFileSync(file, "utf8"));
    console.log(`${LIST_MAP[setor]}: ${allTasks[setor].length} tarefas no CSV`);
  }

  const { lists } = await api("GET", `/folder/${FOLDER_ID}/list?archived=false`);
  const listByName = {};
  for (const l of lists) listByName[l.name.toLowerCase().trim()] = l;

  let created = 0, updated = 0, erros = 0;

  for (const [setor, csvTasks] of Object.entries(allTasks)) {
    const listName = LIST_MAP[setor];
    const list = listByName[listName.toLowerCase().trim()];
    if (!list) { console.warn(`\nAVISO: lista "${listName}" não encontrada no ClickUp`); continue; }

    console.log(`\n[${listName}]`);

    const empField    = await ensureEmpreendimentoField(list.id);
    const statusMap   = await getListStatuses(list.id);
    const clickupTasks = await getTasksFromList(list.id);

    const clickupByName = {};
    for (const t of clickupTasks) clickupByName[t.name.toLowerCase().trim()] = t;

    const missing = csvTasks.filter(t => !clickupByName[t.entrega.toLowerCase().trim()]);
    console.log(`  ${clickupTasks.length} no ClickUp · ${csvTasks.length} no CSV · ${missing.length} faltando`);

    for (const row of csvTasks) {
      const key            = row.entrega.toLowerCase().trim();
      const empClickup     = EMP_MAP[row.empreendimento] || row.empreendimento;
      const empOptionId    = empField.options[empClickup];
      const resolvedStatus = statusMap[row.status.toLowerCase().trim()] || null;
      const dueDate        = toDueDate(row.prazo_dashboard);

      const customFields = [];
      if (empOptionId) customFields.push({ id: empField.id, value: empOptionId });

      if (!clickupByName[key]) {
        try {
          const body = { name: row.entrega, custom_fields: customFields };
          if (resolvedStatus) body.status   = resolvedStatus;
          if (dueDate)        body.due_date = dueDate;
          await api("POST", `/list/${list.id}/task`, body);
          process.stdout.write("C");
          created++;
        } catch (err) {
          console.error(`\n  ERRO criar "${row.entrega}": ${err.message}`);
          erros++;
        }
      } else {
        const existing = clickupByName[key];
        try {
          const body = {};
          if (resolvedStatus) body.status   = resolvedStatus;
          if (dueDate)        body.due_date = dueDate;
          if (Object.keys(body).length) await api("PUT", `/task/${existing.id}`, body);
          for (const f of customFields) {
            await api("POST", `/task/${existing.id}/field/${f.id}`, { value: f.value });
          }
          process.stdout.write(".");
          updated++;
        } catch (err) {
          console.error(`\n  ERRO atualizar "${row.entrega}": ${err.message}`);
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
