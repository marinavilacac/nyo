#!/usr/bin/env node
/**
 * clickup/setup.js
 * Cria a estrutura do projeto Courchevel no ClickUp:
 *   Folder "Courchevel" dentro do Space escolhido
 *   5 listas com status e campos customizados
 *   Salva os IDs em clickup/.config.json para uso pelo import-tasks.js
 *
 * Uso: npm run clickup:setup
 * Pré-requisito: CLICKUP_TOKEN em .env (e opcionalmente CLICKUP_SPACE_ID)
 */

require("dotenv").config();

const TOKEN = process.env.CLICKUP_TOKEN;
if (!TOKEN) {
  console.error("ERRO: CLICKUP_TOKEN não encontrado no .env");
  console.error("Crie um arquivo .env na raiz do projeto com:\n  CLICKUP_TOKEN=pk_xxxxx");
  process.exit(1);
}

const BASE = "https://api.clickup.com/api/v2";

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`ClickUp API ${method} ${path} → ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

const STATUSES = [
  { status: "Backlog",             color: "#6b6b6b", type: "open"   },
  { status: "A iniciar",           color: "#0075ff", type: "open"   },
  { status: "Em produção",         color: "#f2994a", type: "open"   },
  { status: "Aguardando cliente",  color: "#e91e63", type: "open"   },
  { status: "Recorrente",          color: "#7c3aed", type: "open"   },
  { status: "Bloqueado",           color: "#ff0000", type: "open"   },
  { status: "Aprovado / Concluído",color: "#00c875", type: "closed" },
];

const LISTS = [
  "Operação Cliente",
  "Tech",
  "Tráfego",
  "Brand",
  "Social Media",
];

const CUSTOM_FIELDS = [
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
  {
    name: "Pilar",
    type: "drop_down",
    type_config: {
      options: [
        { name: "Brand" },
        { name: "Tráfego" },
        { name: "Tech" },
        { name: "Social Media" },
        { name: "Operação" },
      ],
    },
  },
  {
    name: "Dono NYO",
    type: "drop_down",
    type_config: {
      options: [
        { name: "Marina" },
        { name: "Gabriel" },
        { name: "Pedro" },
        { name: "Caio" },
        { name: "João Batista" },
        { name: "Lucas" },
        { name: "Matheus" },
        { name: "Gustavo" },
        { name: "Guilherme" },
        { name: "Jhon" },
        { name: "França" },
        { name: "Leonardo" },
      ],
    },
  },
  {
    name: "Tipo de entrega",
    type: "drop_down",
    type_config: {
      options: [
        { name: "Layout" },
        { name: "Homologação" },
        { name: "Naming" },
        { name: "Conteúdo" },
        { name: "Relatório" },
        { name: "Plano" },
        { name: "Outro" },
      ],
    },
  },
  {
    name: "Prazo NYO",
    type: "text",
  },
  {
    name: "Prazo cliente",
    type: "text",
  },
  {
    name: "Aprovação tácita",
    type: "checkbox",
  },
];

async function createCustomFields(listId) {
  const fieldMap = {};
  for (const field of CUSTOM_FIELDS) {
    const created = await api("POST", `/list/${listId}/field`, field);
    const optionMap = {};
    if (field.type === "drop_down" && created.type_config?.options) {
      for (const opt of created.type_config.options) {
        optionMap[opt.name] = opt.orderindex;
      }
    }
    fieldMap[field.name] = { id: created.id, options: optionMap };
    process.stdout.write(".");
  }
  return fieldMap;
}

async function main() {
  console.log("=== Setup ClickUp · Projeto Courchevel ===\n");

  // 1. Workspaces
  const { teams } = await api("GET", "/team");
  if (!teams.length) { console.error("Nenhum workspace encontrado."); process.exit(1); }

  let workspace;
  const workspaceIdEnv = process.env.CLICKUP_WORKSPACE_ID;
  if (workspaceIdEnv) {
    workspace = teams.find(t => t.id === workspaceIdEnv);
    if (!workspace) { console.error(`Workspace ${workspaceIdEnv} não encontrado.`); process.exit(1); }
  } else if (teams.length === 1) {
    workspace = teams[0];
  } else {
    console.log("Workspaces disponíveis:");
    teams.forEach(t => console.log(`  [${t.id}] ${t.name}`));
    console.log("\nDefina CLICKUP_WORKSPACE_ID=<id> no .env e rode novamente.");
    process.exit(0);
  }
  console.log(`Workspace: ${workspace.name} (${workspace.id})`);

  // 2. Spaces
  const { spaces } = await api("GET", `/team/${workspace.id}/space?archived=false`);
  let space;
  const spaceIdEnv = process.env.CLICKUP_SPACE_ID;
  if (spaceIdEnv) {
    space = spaces.find(s => s.id === spaceIdEnv);
    if (!space) { console.error(`Space ${spaceIdEnv} não encontrado.`); process.exit(1); }
  } else {
    console.log("\nSpaces disponíveis:");
    spaces.forEach(s => console.log(`  [${s.id}] ${s.name}`));
    if (spaces.length === 1) {
      space = spaces[0];
      console.log(`\nUsando o único space disponível: ${space.name}`);
    } else {
      console.log("\nDefina CLICKUP_SPACE_ID=<id> no .env e rode novamente.");
      process.exit(0);
    }
  }
  console.log(`Space: ${space.name} (${space.id})`);

  // 3. Folder "Courchevel"
  console.log('\nCriando folder "Courchevel"...');
  const folder = await api("POST", `/space/${space.id}/folder`, { name: "Courchevel" });
  console.log(`  OK · folder id: ${folder.id}`);

  // 4. Listas + campos customizados
  const listIds = {};
  const fieldMaps = {};
  for (const listName of LISTS) {
    process.stdout.write(`Criando lista "${listName}"... `);
    const list = await api("POST", `/folder/${folder.id}/list`, {
      name: listName,
      status: STATUSES,
    });
    process.stdout.write(`OK (${list.id}) · campos: `);
    fieldMaps[listName] = await createCustomFields(list.id);
    listIds[listName] = list.id;
    console.log(" OK");
  }

  // 5. Salva config
  const fs = require("fs");
  const config = { workspaceId: workspace.id, spaceId: space.id, folderId: folder.id, listIds, fieldMaps };
  fs.writeFileSync("clickup/.config.json", JSON.stringify(config, null, 2));
  console.log("\nConfig salvo em clickup/.config.json");
  console.log("\nPróximo passo: npm run clickup:import");
}

main().catch(err => { console.error("\nERRO:", err.message); process.exit(1); });
