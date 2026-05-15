# Pacote Claude Marina 2.0, Projeto NYO × Courchevel

> Pacote operacional para a Marina Vilaça (PM NYO, ponto focal do projeto Courchevel) usar no Claude Code dela e gerar documentos do projeto no mesmo padrão visual que o Gabriel usa.
>
> **Versão 2.0**, atualizada em 14/05/2026 com tudo que foi consolidado no onboarding oficial (14/05) e nas decisões pós-call.

---

## O que este pacote te dá

1. **Contexto completo do projeto Courchevel** (este arquivo) carregado automaticamente pelo Claude Code toda vez que você abrir esta pasta. Não precisa explicar o projeto pro Claude, ele já sabe.
2. **Skill `criar-ata-reuniao`** em [.claude/skills/criar-ata-reuniao/](.claude/skills/criar-ata-reuniao/), que gera ata em `.docx` no padrão visual oficial NYO a partir de uma transcrição ou notas de reunião.
3. **Exemplo canônico** da ata de onboarding (14/05/2026) em markdown e JSON, para referência de schema e estilo.
4. **Scripts prontos** (`build_ata.js`, `docx_to_pdf.js`) com a identidade visual NYO hardcoded.

Como usar no dia a dia: ver [prompt-inicial.md](prompt-inicial.md) e [README.md](README.md).

---

## O projeto, em uma frase

NYO (GM SOLUCOES LTDA) é a agência contratada da Courchevel Inc para operar 4 pilares (Brand, Tráfego, Tech, Social Media) num contrato de R$ 30.000/mês, vigência mínima 3 meses. Marina é o ponto focal único de comunicação NYO ↔ Courchevel.

## Stakeholders Courchevel

| Nome | Papel | Como tratar |
|---|---|---|
| **Enzo Delmondes** | Gestor Comercial | Decisor único do dia a dia. Toda aprovação operacional passa por ele. Marina conversa com Enzo, não com Joelson. |
| **Joelson Dos Santos Teixeira Delmondes** | Founder | Aprovador estratégico de marca e direção de produto. Participa só de momentos críticos. |
| Rodrigo | Head de vendas Triunfo | Não esteve no onboarding. Candidato a aparecer em vídeos do empreendimento. |
| Priscila | Gerente do Allure | Ponto de relacionamento histórico com influenciadores (modelo de permuta). |

## Time NYO no projeto

| Nome | Função | Quando entra |
|---|---|---|
| Gabriel Soier | Sócio / Estratégia | Decisões estratégicas, visitas presenciais, calls críticas |
| Pedro Lucena | Sócio / Estratégia | Mais presente que o padrão NYO neste projeto |
| **Marina Vilaça** | **PM, ponto focal** | **Você.** Centraliza toda comunicação com Enzo. |
| Caio Souza | Gestor de Tráfego | Pilar 2 (Tráfego) |
| João | Tech | Pilar 3 (Tech, agentes IA, CRM, LPs) |
| Gustavo Araújo + França | Brand & Design | Pilar 1 (Brand) |
| Leonardo Sérgio | Social Media | Pilar 4 (Social Media) |
| John | Filmmaker | Gravações nos empreendimentos |
| Lucas e Mateus | Agentes de IA | Implementação de SDR e Concierge |

---

## Os 5 empreendimentos sob escopo

> Regra crítica: toda entrega é amarrada a **1 desses 5** (ou marcada como `Cross` se for transversal). Nunca esquecer da **Chevalier**, é o esquecimento recorrente do projeto.

| # | Nome | Código | Status | Pilares NYO |
|---|---|---|---|---|
| 1 | Courchevel Institucional | CVC | Reativação imediata | Brand + Social (@courchevelinc) + Tech (LP institucional) |
| 2 | Triunfo Campo Belo | TRF | Em pré-lançamento | Tráfego + Tech (LP + SDR) + Social |
| 3 | Allure Moema | ALR | Operação hoteleira ativa | Tráfego + Tech (LP + SDR + Concierge) + Social |
| 4 | Novo Empreendimento Premium ("Brooklyn", interno) | a definir | **Naming em curso** | Brand (naming + identidade) + Tech (LP + SDR + Concierge) |
| 5 | Chevalier | CHV | Standby operacional, segue no radar | Brand (brandbook) + Tech (LP) + Social (standby) |

### Detalhes operacionais por empreendimento

**Allure (Moema):**
- 128 unidades totais, 84 são da Courchevel, 44 de terceiros
- Ocupação média 60 a 65%, fundo em dezembro e janeiro (manutenção)
- Público principal: feiras e eventos da Expo Imigrantes, chega via Congonhas
- Problema crítico: identidade fragmentada entre Booking ("Maia Luri"), Google e Instagram ("Luri", "Allure"). NYO consolida nos primeiros 30 dias.
- Fórmula 1 2026 vendida abaixo da margem, campanha 2027 antecipada
- Instagram: @allure.moema, 10.111 followers

**Triunfo Campo Belo:**
- 52 unidades de 80m², sem estúdios, sem NR, 2 lojas sem restaurante
- Diferenciais técnicos: floreiras na varanda e suíte, terraço técnico externo, persianas elétricas com blackout, guarda-corpo em vidro, ponto para churrasqueira a carvão, pé direito 2,88m, portas de madeira maciça, tratamento acústico em paredes externas, andar técnico com piscina
- Diferencial comercial: opção de entrega 100% decorada (raro em SP pós-entrega)
- Público-alvo: jovem bem-sucedido, divorciados querendo permanecer na região, casais em ninho vazio
- Posicionamento: "valor antes do preço"
- Instagram: a criar pela NYO

**Novo Empreendimento Premium:**
- Localização provisória: "Brooklyn"
- Prazo crítico: logo, marca e cores antes da entrega física (placas de elevador, hall)
- Reunião dedicada de Brand: 15/05/2026 manhã (Gustavo + Marina + Enzo + Joelson)

**Courchevel Institucional:**
- Posicionamento: incorporadora e construtora ao mesmo tempo (constrói o que vende)
- Instagram @courchevelinc: 2.609 followers, em hibernação há 103 dias
- Bio será reescrita pra viabilizar pedido de selo verificado

**Chevalier:**
- Em standby operacional, mas permanece no radar
- NYO solicitou formalmente ao cliente detalhamento por escrito (escopo, expectativas, materiais)
- **Não esquecer.** Em toda planilha, dashboard ou planejamento, Chevalier aparece.

---

## Os 4 pilares NYO no contrato

### Pilar 1, Brand
Identidade completa do Novo Empreendimento Premium (naming, identidade visual, manual, assets digitais).

Fluxo: imersão → briefing aprovado por escrito → naming (10 d.u. após briefing) → identidade visual (15 d.u. após naming aprovado) → manual + assets (5 d.u. após identidade aprovada). 3 rodadas de revisão inclusas.

### Pilar 2, Tráfego
Meta Ads + Google Ads para Triunfo, Allure e (futuro) Premium.

Entregas mensais: gestão, otimização semanal, segmentação por temperatura, **relatório semanal toda segunda-feira**. Planejamento de mídia enviado dia 25 do mês anterior, cliente tem 3 d.u. pra aprovar. Verba de mídia é do cliente.

### Pilar 3, Tech
Agentes IA WhatsApp (SDR + Concierge), CRM, Dashboard, LPs, Sistema de Precificação.

Prazos a partir da assinatura:
- LP Triunfo: 10 d.u.
- LP Allure: 20 d.u.
- LP Institucional Courchevel: 30 d.u.
- LP Premium: 40 d.u. (condicionada a naming)
- SDR Triunfo + Allure: 25 d.u.
- Concierge Allure + Premium: 25 d.u.
- CRM: 30 d.u.
- Dashboard: 30 d.u.

Homologação cliente: 5 d.u. após recebimento. Silêncio = aceito.

### Pilar 4, Social Media
2 perfis de Instagram (cliente escolhe). Volume mensal por perfil:
- 6 Reels
- 4 posts estáticos
- 2 posts institucionais
- 12 a 20 stories

Calendário enviado dia 25 do mês anterior, aprovado dia 30. Cliente tem 2 d.u. pra aprovar cada conteúdo finalizado. Material do cliente: 72h de antecedência mínima.

---

## Prazos críticos de resposta do cliente

> Tudo abaixo: silêncio = aprovação tácita. Marina precisa fiscalizar e cobrar por escrito.

| Contexto | Prazo | Consequência do silêncio |
|---|---|---|
| Feedback de branding (por rodada) | 5 d.u. | Aprovação tácita |
| Homologação Tech | 5 d.u. | Entrega aceita |
| Aprovação de layout de LP | 3 d.u. | Layout aprovado, desenvolvimento inicia |
| Planejamento de Mídia | 3 d.u. | Plano aprovado, NYO executa |
| Calendário editorial Social | Dia 28 do mês anterior | Aprovado dia 30 |
| Aprovação de conteúdo finalizado | 2 d.u. | NYO autorizada a publicar |

---

## Datas-âncora pós-onboarding (14/05/2026)

| Data | Evento |
|---|---|
| **15/05** | Reunião de Brand do Novo Premium (Gustavo + Marina + Enzo + Joelson), prioridade alta |
| 15/05 | Briefings de Brand, Tráfego, Tech e Social entregues à Courchevel |
| 15/05 | Moodboards dos 3 empreendimentos apresentados (Premium ainda sem moodboard, sem nome) |
| **16/05** | Primeiro resumo semanal enviado pela Marina |
| 19 a 24/05 | Janela de gravação Allure (manhã) + Triunfo (qualquer horário) com John |
| **25/05** | Primeiro sprint do contrato fechado, LIVE dos ads |

---

## Como o Gabriel quer os documentos

### Regras absolutas de estilo (todo entregável)

1. **Travessão longo é proibido.** É marca registrada de LLM e contamina a voz. Substituir por vírgula, ponto ou dois pontos. Hífen comum (palavra-composta) e en-dash de range (10 a 20) podem.
2. **Frases curtas. Direto ao ponto.** Sem rodeios, sem "vamos pensar juntos", sem "espero que isso ajude".
3. **Português correto e formal.** Cliente é incorporadora premium, o tom acompanha.
4. **Dados em evidência.** ROAS, CPL, VGV, taxa de conversão são a linguagem da NYO. Quando houver número, ele tem que estar visível.
5. **Aprovação escrita sempre.** Nada de "ok verbal na call", sempre solicitar confirmação por escrito.
6. **Não inventar.** Se a informação não tá nas notas ou na transcrição, perguntar. Documento oficial não comporta hipótese.

### Status válidos em planilha (nunca usar "Entregue")

- `Backlog`, ainda não começou
- `Em produção`, equipe trabalhando
- `Aguardando cliente`, bloqueado por input/aprovação
- `Concluído`, pronto (usar isto no lugar de "Entregue")
- `Aprovado`, cliente aprovou explicitamente
- `Atrasado`, passou do prazo

### Nomenclatura de arquivos

Padrão: `CVC-<TIPO>-<DESCRICAO>.ext`

Tipos válidos: `COPY` `PLANILHA` `PAGINA` `BRIEFING` `PROPOSTA` `CONTRATO` `RELATORIO` `ATA` `APRESENTACAO` `VIDEO` `SCRIPT`

Exemplos:
- `CVC-ATA-ONBOARDING.docx`
- `CVC-RELATORIO-SEMANAL-2026-W20.docx`
- `CVC-BRIEFING-BRAND-PREMIUM.docx`

---

## Identidade visual NYO (referência)

Já está hardcoded nos scripts. Não precisa alterar. Para referência:

| Token | Hex | Uso |
|---|---|---|
| Vermelho NYO | `#FF0000` | Tags, destaques, CTAs |
| Preto principal | `#111111` | Texto primário |
| Cinza muted | `#6B6B6B` | Texto secundário |
| Linha sutil | `#E0E0E0` | Bordas, divisórias |
| Warm bege | `#FAF6EF` | Caixas de atenção |

Tipografia:
- Corpo e headings: **Arial** (fallback do Sequel Sans, fonte oficial NYO)
- Tags `// SEÇÃO`: **Space Grotesk** (Google Fonts)
- Mono: **Courier New**

Taglines oficiais NYO: `// AI AGENTS NEVER SLEEP` · `// AUDIENCE NEVER SLEEP`

---

## Estrutura de pastas recomendada

Espelha a estrutura que o Gabriel mantém localmente. Quando você gera uma ata, salva em `06-reunioes/<slug>/`:

```
Claude-Marina-2.0/
├── CLAUDE.md                    ← este arquivo
├── prompt-inicial.md            ← primeira mensagem pro Claude
├── README.md                    ← como rodar
├── package.json                 ← dependências (docx)
├── .claude/
│   └── skills/
│       └── criar-ata-reuniao/   ← a skill
│           ├── SKILL.md
│           ├── scripts/
│           │   ├── build_ata.js
│           │   └── docx_to_pdf.js
│           └── exemplos/
│               ├── ata-kickoff.md
│               └── ata-kickoff-content.json
└── 06-reunioes/                 ← suas atas vão aqui
    └── <slug-da-reuniao>/
        ├── ata-content.json
        └── ata-<slug>.docx
```

---

## O que ainda NÃO está neste pacote (versão 2.0)

Para evitar inflar o escopo, esta versão cobre **apenas ata de reunião**. Os próximos blocos vão entrar em 3.0:

- Resumo semanal (toda sexta, todos os pilares)
- Templates de briefing (Brand, Tráfego, Tech, Social)
- Calendário editorial visual
- Painel de pendências cliente / NYO

Quando precisar de qualquer um desses, pede pro Gabriel a versão atualizada.
