---
name: criar-ata-reuniao
description: Gera ata de reunião do projeto Courchevel no padrão visual oficial NYO (.docx). Use SEMPRE que a Marina pedir "criar ata", "gerar ata", "monta a ata da reunião de X", "transforma essa transcrição em ata", "ata do kickoff", "ata da call de Y" ou colar uma transcrição/notas de reunião pedindo o documento formal. Skill é específica do projeto Courchevel, não usar pra outros clientes.
---

# Skill, Criar Ata de Reunião NYO × Courchevel

## Quando ativar

Toda vez que a Marina (ou Gabriel, ou outro PM) pedir um dos abaixo:

- "Gera a ata da reunião"
- "Monta a ata do kickoff / da call X"
- "Transforma essa transcrição em ata"
- "Cria o documento da reunião de hoje"
- "Ata de Y" (onde Y é uma data ou nome de reunião)

E colar transcrição, notas de reunião, ou bullets soltos.

## Como executar

O fluxo é em duas fases. Sempre nessa ordem.

### Fase 1, Estruturar conteúdo em JSON

1. Ler o exemplo canônico em [exemplos/ata-kickoff-content.json](exemplos/ata-kickoff-content.json). Esse arquivo é a fonte de verdade do schema. Não invente campos. Não omita campos obrigatórios.
2. Receber a transcrição/notas do usuário.
3. Extrair e preencher cada seção do schema (ver "Schema completo" abaixo). Se a reunião não cobriu uma seção (ex.: não houve "falas de destaque"), entregar a seção vazia `[]` ou omitir conforme indicado.
4. Salvar o JSON resultante em `06-reunioes/<slug-da-reuniao>/ata-content.json` (slug em kebab-case com data ISO no início, ex.: `2026-05-22-aprovacao-naming`).
5. Pedir confirmação ao usuário antes de gerar o .docx. Mostrar resumo executivo (3 a 5 bullets) do que foi extraído e a lista de seções preenchidas. Não pular essa etapa, ata sem revisão humana vai pro cliente errada.

### Fase 2, Gerar o .docx

Após confirmação:

```bash
cd /caminho/para/Claude-Marina-2.0
node .claude/skills/criar-ata-reuniao/scripts/build_ata.js \
  06-reunioes/<slug-da-reuniao>/ata-content.json \
  06-reunioes/<slug-da-reuniao>/ata-<slug>.docx
```

Pré-requisito: rodar `npm install` uma vez na raiz do projeto (instala a lib `docx`). Se der erro `Cannot find module 'docx'`, é isso.

Arquivos gerados:
- `ata-<slug>.docx`, entrega oficial. É o que vai pro cliente.
- (opcional) Para PDF: `node .claude/skills/criar-ata-reuniao/scripts/docx_to_pdf.js <ata>.docx <ata>.pdf`, usa LibreOffice ou Pandoc local. Se não tiver, ignore, .docx basta.

### Convenção de nome do arquivo final

Padrão NYO: `CVC-ATA-<DESCRICAO-CURTA>.docx`. Exemplos:
- `CVC-ATA-ONBOARDING.docx`
- `CVC-ATA-APROVACAO-NAMING-PREMIUM.docx`
- `CVC-ATA-BRAND-TRIUNFO-2026-06-03.docx`

## Schema completo (resumo prático)

Todos os campos abaixo são esperados pelo `build_ata.js`. Olhe o exemplo se tiver dúvida em qualquer um.

| Campo | Tipo | Obrigatório | Conteúdo |
|---|---|---|---|
| `header.label` | string | sim | `"NYO × COURCHEVEL"` (fixo) |
| `header.kind` | string | sim | `"Ata de Reunião"` (fixo) |
| `header.title` | string | sim | Nome curto da reunião (`"Onboarding"`, `"Aprovação Naming"`, etc.) |
| `header.subtitle` | string | sim | Frase de uma linha explicando o objetivo da call |
| `ficha.cliente` | string | sim | `"Courchevel Inc"` |
| `ficha.data` | string | sim | Data por extenso (`"14 de maio de 2026"`) |
| `ficha.modalidade` | string | sim | `"Online · gravada"` ou `"Presencial"` |
| `ficha.duracao` | string | sim | `"~90 minutos"` |
| `contexto` | array de strings | sim | 1 a 3 parágrafos de contexto |
| `participantes.cliente` | array de `{nome, papel, obs?}` | sim | Quem da Courchevel estava |
| `participantes.nyo` | array de `{nome, papel, obs?}` | sim | Quem da NYO estava |
| `decisoes` | array de `{titulo, descricao?, bullets?}` | sim | Decisões formalizadas na call |
| `acordos` | array de `{titulo, paragrafos}` | sim | Acordos por tema/empreendimento |
| `dependencia_cliente` | `{titulo, label, palette, texto, complemento}` | opcional | Caixa de "atenção" sobre o que destrava só com o cliente. Use `palette: "warm"`. |
| `pendencias_cliente` | array de `[item, responsavel, prazo]` | sim | Tabela do que o cliente deve fazer |
| `pendencias_nyo` | array de `[entrega, responsavel, prazo]` | sim | Tabela do que a NYO entrega |
| `stakeholders` | array de `{nome, papel, obs}` | opcional | Mencionados mas ausentes |
| `proximos_passos` | array de `{titulo, bullets}` | sim | Cronograma firmado, agrupado por data/janela |
| `falas` | array de `{autor, texto}` | opcional | Quotes-chave da reunião |
| `pontos_atencao` | array de `{titulo, descricao}` | opcional | Riscos/observações registradas pela NYO |
| `assinatura` | string | sim | `"Ata produzida em <data> pela NYO. Reunião gravada e transcrição arquivada no Drive oficial do projeto."` |

## Regras de extração (importantes)

1. Nunca inventar. Se a transcrição não menciona o item, deixe a seção vazia ou pergunte ao usuário antes. Ata é documento oficial, não tem espaço pra hipótese.
2. Decisão vs. acordo. Decisão = algo que foi formalmente decidido na call (ex.: "Enzo é o decisor único"). Acordo = consenso sobre o que cada empreendimento é/precisa (ex.: descrição do Triunfo). Não misture.
3. Pendência precisa ter responsável nominal. Nunca aceitar "alguém da NYO", sempre apontar pessoa específica.
4. Prazo absoluto, nunca relativo. Converter "semana que vem" para "19 a 24/05". Hoje no contexto é fornecido pelo sistema.
5. Quote literal entre aspas no campo `falas`. Não parafrasear. Se a frase original tem erro de português, mantenha, é registro.
6. Travessão longo é proibido na escrita. Substituir por vírgula, ponto ou dois pontos. Regra global do Gabriel, aplica a tudo que vira entregável.
7. Empreendimentos sob escopo: Courchevel institucional, Triunfo Campo Belo, Allure Moema, Novo Empreendimento Premium ("Brooklyn" até naming sair), Chevalier (standby). Nunca esquecer da Chevalier, esquecimento recorrente.

## Estrutura visual gerada (referência)

A ata final tem:
- Header com tag `// NYO × COURCHEVEL` em vermelho e título grande em preto
- Ficha técnica em caixa cinza (cliente, data, modalidade, duração)
- Seções numeradas em ordem fixa: Contexto, Participantes, Decisões, Acordos, Dependência, Pendências cliente, Pendências NYO, Stakeholders, Próximos passos, Falas, Pontos de atenção, Assinatura
- Tabelas com bordas finas, header em vermelho NYO
- Caixa de "Atenção" warm (fundo creme, borda vermelha) para dependência crítica
- Quotes com barra vertical vermelha à esquerda
- Footer com número de página

Identidade visual oficial NYO: vermelho `#FF0000`, tipografia Arial (corpo) e Space Grotesk (tags). Já está hardcoded no `build_ata.js`. Não alterar.

## Checklist antes de entregar

- [ ] JSON salvo em `06-reunioes/<slug>/ata-content.json`
- [ ] Resumo executivo aprovado pelo usuário antes de gerar .docx
- [ ] `.docx` aberto e revisado visualmente (abrir no Word/Pages e olhar)
- [ ] Nome do arquivo segue padrão `CVC-ATA-<DESCRICAO>.docx`
- [ ] Sem travessão longo no texto
- [ ] Toda pendência tem responsável nominal e prazo absoluto
- [ ] Falas em quote literal
- [ ] Confirmar com Marina antes de enviar ao cliente (regra do contrato: aprovação escrita)

## Erros comuns

| Sintoma | Causa | Fix |
|---|---|---|
| `Cannot find module 'docx'` | Faltou `npm install` | Rodar `npm install` na raiz |
| `.docx` quebrado / não abre | JSON com sintaxe inválida | Validar com `cat ata-content.json \| python3 -m json.tool` |
| Tabela vazia no .docx | Array `pendencias_cliente` em formato errado | Cada linha deve ser `["item", "responsavel", "prazo"]` (3 strings) |
| Cores erradas | Alguém mexeu no `build_ata.js` | Restaurar do git/backup. Paleta é hardcoded e não muda |

## Referência canônica

Quando em dúvida, consultar [exemplos/ata-kickoff.md](exemplos/ata-kickoff.md) (markdown) e [exemplos/ata-kickoff-content.json](exemplos/ata-kickoff-content.json) (schema). É a primeira ata oficial do projeto e define o padrão para todas as seguintes.
