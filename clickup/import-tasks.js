#!/usr/bin/env node
/**
 * clickup/import-tasks.js
 * Lê tarefas-30-dias.csv e cria todas as tarefas nas listas corretas do ClickUp.
 * Usa clickup/.config.json gerado pelo setup.js.
 *
 * Uso: npm run clickup:import
 */

require("dotenv").config();

const fs   = require("fs");
const path = require("path");

const TOKEN = process.env.CLICKUP_TOKEN;
if (!TOKEN) {
  console.error("ERRO: CLICKUP_TOKEN não encontrado no .env");
  process.exit(1);
}

const CONFIG_PATH = path.join(__dirname, ".config.json");
if (!fs.existsSync(CONFIG_PATH)) {
  console.error("ERRO: clickup/.config.json não encontrado. Rode npm run clickup:setup primeiro.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const BASE   = "https://api.clickup.com/api/v2";

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

function parseCSV(content) {
  const lines  = content.trim().split("\n");
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

function resolveCustomFields(listName, task) {
  const fm = config.fieldMaps[listName];
  if (!fm) return [];

  const fields = [];

  const addDropdown = (fieldName, value) => {
    const field = fm[fieldName];
    if (!field || !value || value === "N/A") return;
    const orderindex = field.options[value];
    if (orderindex !== undefined) {
      fields.push({ id: field.id, value: orderindex });
    }
  };

  const addText = (fieldName, value) => {
    const field = fm[fieldName];
    if (!field || !value || value === "N/A") return;
    fields.push({ id: field.id, value });
  };

  addDropdown("Empreendimento",   task["Empreendimento"]);
  addDropdown("Pilar",            task["Pilar"]);
  addDropdown("Dono NYO",         task["Dono NYO"]);
  addDropdown("Tipo de entrega",  task["Tipo de entrega"]);
  addText("Prazo NYO",            task["Quando dispara"]);
  addText("Prazo cliente",        task["Prazo cliente (após receber)"]);

  return fields;
}

async function main() {
  console.log("=== Import tarefas · Projeto Courchevel ===\n");

  const csvPath = path.join(__dirname, "tarefas-30-dias.csv");
  if (!fs.existsSync(csvPath)) {
    console.error("ERRO: clickup/tarefas-30-dias.csv não encontrado.");
    process.exit(1);
  }

  const tasks = parseCSV(fs.readFileSync(csvPath, "utf8"));
  console.log(`${tasks.length} tarefas encontradas no CSV\n`);

  let ok = 0, erros = 0;

  for (const task of tasks) {
    const listName = task["Lista"];
    const listId   = config.listIds[listName];
    if (!listId) {
      console.warn(`  AVISO: lista "${listName}" não encontrada no config. Pulando: ${task["Nome da tarefa"]}`);
      erros++;
      continue;
    }

    const customFields = resolveCustomFields(listName, task);

    const body = {
      name:          task["Nome da tarefa"],
      description:   task["Descrição"] || "",
      status:        task["Status"],
      custom_fields: customFields,
    };

    try {
      await api("POST", `/list/${listId}/task`, body);
      process.stdout.write(".");
      ok++;
    } catch (err) {
      console.error(`\n  ERRO ao criar "${task["Nome da tarefa"]}": ${err.message}`);
      erros++;
    }
  }

  console.log(`\n\nConcluído. ${ok} tarefas criadas, ${erros} erros.`);
  if (erros > 0) console.log("Verifique os erros acima e rode novamente se necessário.");
}

main().catch(err => { console.error("\nERRO:", err.message); process.exit(1); });
