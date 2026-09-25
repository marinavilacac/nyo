#!/usr/bin/env node
/**
 * clickup/status.js
 * Consulta tarefas em aberto no ClickUp e exibe resumo por empreendimento ou pilar.
 *
 * Uso:
 *   npm run clickup:status
 *   npm run clickup:status -- --empreendimento=Allure
 *   npm run clickup:status -- --pilar=Tech
 *   npm run clickup:status -- --status="Aguardando cliente"
 */

require("dotenv").config();

const fs   = require("fs");
const path = require("path");

const TOKEN = process.env.CLICKUP_TOKEN;
if (!TOKEN) { console.error("ERRO: CLICKUP_TOKEN não encontrado no .env"); process.exit(1); }

const CONFIG_PATH = path.join(__dirname, ".config.json");
if (!fs.existsSync(CONFIG_PATH)) {
  console.error("ERRO: clickup/.config.json não encontrado. Rode npm run clickup:setup primeiro.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const BASE   = "https://api.clickup.com/api/v2";

// Parseia args: --key=value
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith("--"))
    .map(a => { const [k, v] = a.slice(2).split("="); return [k, v || true]; })
);

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

function getFieldValue(task, fieldName, listName) {
  const fm = config.fieldMaps[listName];
  if (!fm || !fm[fieldName]) return "";
  const field = task.custom_fields?.find(f => f.id === fm[fieldName].id);
  if (!field || field.value === undefined || field.value === null) return "";
  if (field.type === "drop_down") {
    const opts = fm[fieldName].options;
    const entry = Object.entries(opts).find(([, idx]) => idx === field.value);
    return entry ? entry[0] : String(field.value);
  }
  return String(field.value);
}

async function fetchAllTasks() {
  const allTasks = [];
  for (const [listName, listId] of Object.entries(config.listIds)) {
    let page = 0, more = true;
    while (more) {
      const data = await api("GET", `/list/${listId}/task?page=${page}&include_closed=false`);
      for (const t of (data.tasks || [])) {
        allTasks.push({ ...t, _listName: listName });
      }
      more = data.tasks?.length === 100;
      page++;
    }
  }
  return allTasks;
}

function statusEmoji(status) {
  const s = status.toLowerCase();
  if (s.includes("bloqueado"))          return "🔴";
  if (s.includes("aguardando cliente")) return "🟡";
  if (s.includes("produção"))           return "🟠";
  if (s.includes("recorrente"))         return "🟣";
  if (s.includes("iniciar"))            return "🔵";
  if (s.includes("backlog"))            return "⚪";
  return "✅";
}

async function main() {
  console.log("=== Status do Projeto Courchevel ===\n");

  const tasks = await fetchAllTasks();
  const open  = tasks.filter(t => !["aprovado / concluído"].includes(t.status?.status?.toLowerCase()));

  let filtered = open;

  if (args.empreendimento) {
    filtered = filtered.filter(t => getFieldValue(t, "Empreendimento", t._listName) === args.empreendimento);
    console.log(`Filtro: Empreendimento = ${args.empreendimento}\n`);
  }
  if (args.pilar) {
    filtered = filtered.filter(t => getFieldValue(t, "Pilar", t._listName) === args.pilar);
    console.log(`Filtro: Pilar = ${args.pilar}\n`);
  }
  if (args.status) {
    filtered = filtered.filter(t => t.status?.status?.toLowerCase().includes(args.status.toLowerCase()));
    console.log(`Filtro: Status = ${args.status}\n`);
  }

  if (!filtered.length) {
    console.log("Nenhuma tarefa encontrada com os filtros aplicados.");
    return;
  }

  // Agrupa por lista
  const byList = {};
  for (const t of filtered) {
    if (!byList[t._listName]) byList[t._listName] = [];
    byList[t._listName].push(t);
  }

  for (const [listName, listTasks] of Object.entries(byList)) {
    console.log(`── ${listName} (${listTasks.length}) ──`);
    for (const t of listTasks) {
      const emp   = getFieldValue(t, "Empreendimento", listName);
      const dono  = getFieldValue(t, "Dono NYO",       listName);
      const prazo = getFieldValue(t, "Prazo NYO",      listName);
      const tag   = [emp, dono].filter(Boolean).join(" · ");
      console.log(`  ${statusEmoji(t.status?.status)} ${t.name}`);
      if (tag)   console.log(`     ${tag}`);
      if (prazo) console.log(`     Prazo: ${prazo}`);
    }
    console.log();
  }

  // Resumo de aguardando cliente
  const bloqueados = open.filter(t => t.status?.status?.toLowerCase().includes("aguardando cliente"));
  if (bloqueados.length && !args.status) {
    console.log(`⚠️  ${bloqueados.length} tarefa(s) aguardando o cliente:`);
    for (const t of bloqueados) {
      console.log(`  • ${t.name}`);
    }
  }
}

main().catch(err => { console.error("\nERRO:", err.message); process.exit(1); });
