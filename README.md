# Claude Marina 2.0, NYO × Courchevel

Pacote de Claude Code da Marina pra gerar atas de reunião do projeto Courchevel no padrão visual oficial NYO.

## Setup, primeira vez (5 minutos)

### 1. Pré-requisitos no Mac/PC

- **Node.js 18+** instalado. Testar com: `node -v`
- **Claude Code CLI** instalado e logado. Testar com: `claude --version`

Se faltar algum, ver:
- Node: https://nodejs.org/
- Claude Code: https://docs.anthropic.com/en/docs/claude-code

### 2. Descompactar e instalar deps

```bash
# Entrar na pasta (ajustar o caminho pro lugar onde você descompactou)
cd ~/Documents/Claude-Marina-2.0

# Instalar a lib docx (única dependência, ~5 MB)
npm install
```

Isso cria a pasta `node_modules/` e baixa a lib `docx`. Roda uma vez só.

### 3. Abrir o Claude Code dentro da pasta

```bash
claude
```

O Claude Code carrega o `CLAUDE.md` automaticamente e você já tem contexto do projeto.

### 4. Primeira mensagem

Abrir [prompt-inicial.md](prompt-inicial.md), copiar o bloco de código e colar como primeira mensagem no Claude. Isso garante que ele leu o contexto e está pronto.

---

## Uso recorrente

Toda vez que sair de uma reunião:

1. `cd ~/Documents/Claude-Marina-2.0 && claude`
2. Cola a transcrição (ou notas, ou bullets soltos) e diz **"Gera a ata dessa reunião."**
3. Claude estrutura em JSON, te mostra um resumo, você aprova
4. Claude roda o script e gera o `.docx`
5. Você abre no Word/Pages, revisa, ajusta se precisar
6. Envia pro Enzo no grupo WhatsApp por escrito

---

## Estrutura de pastas

```
Claude-Marina-2.0/
├── CLAUDE.md                    ← contexto Courchevel (carregado auto)
├── prompt-inicial.md            ← primeira mensagem
├── README.md                    ← este arquivo
├── package.json                 ← deps
├── .claude/
│   └── skills/
│       └── criar-ata-reuniao/
│           ├── SKILL.md
│           ├── scripts/
│           │   ├── build_ata.js     ← gerador .docx
│           │   └── docx_to_pdf.js   ← opcional, converte pra PDF
│           └── exemplos/
│               ├── ata-kickoff.md
│               └── ata-kickoff-content.json
└── 06-reunioes/                 ← suas atas (criada conforme uso)
    └── <slug>/
        ├── ata-content.json
        └── ata-<slug>.docx
```

---

## Comandos manuais (caso queira rodar sem o Claude)

Gerar `.docx` direto a partir de um JSON pronto:

```bash
node .claude/skills/criar-ata-reuniao/scripts/build_ata.js \
  06-reunioes/2026-05-22-aprovacao-naming/ata-content.json \
  06-reunioes/2026-05-22-aprovacao-naming/ata-aprovacao-naming.docx
```

Converter `.docx` para `.pdf` (opcional, requer LibreOffice ou Pandoc instalado):

```bash
node .claude/skills/criar-ata-reuniao/scripts/docx_to_pdf.js \
  06-reunioes/2026-05-22-aprovacao-naming/ata-aprovacao-naming.docx \
  06-reunioes/2026-05-22-aprovacao-naming/ata-aprovacao-naming.pdf
```

---

## Troubleshooting

| Erro | Causa | Fix |
|---|---|---|
| `Cannot find module 'docx'` | Não rodou `npm install` | Rodar `npm install` na raiz do pacote |
| `command not found: claude` | Claude Code não instalado | Instalar via https://docs.anthropic.com/en/docs/claude-code |
| `.docx` não abre / tá quebrado | JSON com sintaxe inválida | `cat ata-content.json \| python3 -m json.tool` pra validar |
| Cores estranhas no `.docx` | Alguém editou o `build_ata.js` | Pedir o pacote novo pro Gabriel |

---

## Versão

**2.0**, 14/05/2026. Cobre apenas ata de reunião. Próximos pacotes (3.0+) vão incluir resumo semanal, briefings e calendário editorial.

Em caso de dúvida fora do escopo da ata: falar com Gabriel.
