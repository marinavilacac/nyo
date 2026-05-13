# Pilares e entregas

> Os 4 pilares contratados, com cada entrega e os prazos **conforme o contrato**.
>
> **Atenção crítica:** os prazos contratuais são **relativos a eventos**, não datas fixas no calendário. A maioria começa a contar a partir da aprovação do briefing pelo cliente. Você só converte em data real quando o evento gatilho acontecer.

---

## Por que prazos relativos e não datas fixas

O contrato diz, por exemplo, que a LP1 Triunfo é entregue em **10 DU pós aprovação do briefing**. Se o cliente aprovar o briefing no dia 18, entrega no dia 1 do mês seguinte. Se aprovar no dia 25, entrega 9 DU depois. Você precisa ver o projeto em termos de cadeia de eventos, não calendário.

**Mapa de eventos-gatilho do projeto:**

| Evento | Quem dispara | O que destrava |
|---|---|---|
| Onboarding realizado | NYO + Cliente | Briefings entregues ao cliente |
| Briefing de naming aprovado em escrita | Cliente | Início do naming (Anexo 1) |
| Briefing de ID visual aprovado em escrita | Cliente | Início da identidade visual (após naming aprovado) |
| Briefing dos agentes aprovado | Cliente | Build dos Agentes IA (Anexo 3) |
| Aprovação dos layouts de LP | Cliente (3 DU) | Desenvolvimento das LPs em código |
| Naming escolhido pelo cliente | Cliente (5 DU) | Início da identidade visual |
| Identidade visual aprovada | Cliente | Manual de marca + assets digitais |
| Verba de mídia disponível na plataforma | Cliente | Campanhas no ar |
| Acessos liberados (Meta, Google, GA4, etc) | Cliente | Setup técnico de tráfego |

Sem o evento-gatilho, a entrega NYO não inicia (ou fica em status "Aguardando cliente" no seu ClickUp).

---

## Pilar 01 · Brand

Identidade completa do **Novo Empreendimento Premium** partindo do zero. 3 rodadas de revisão inclusas (4ª em diante cobrada à parte). Cliente tem 5 DU para feedback consolidado por rodada.

| Entrega | Prazo NYO | Prazo cliente | Dono NYO |
|---|---|---|---|
| Briefing de naming aprovado em imersão escrita | Durante a onboarding | Aprovação na própria reunião por escrito | Gustavo + Gabriel |
| Naming: 30+ opções, 3 a 5 propostas finais ao cliente | **10 DU** após aprovação do briefing | 5 DU para escolher | Gustavo + Guilherme |
| Identidade visual proposta inicial | **15 DU** após aprovação do naming | 5 DU para feedback por rodada (3 rodadas inclusas) | Gustavo + Guilherme |
| Manual de marca | Entregue junto com identidade visual aprovada | --- | Gustavo + Guilherme |
| Assets digitais (feed quadrado, retrato, stories, banners) | **5 DU** após aprovação final da identidade visual | --- | Guilherme |

---

## Pilar 02 · Tráfego

Criação, gestão e otimização de campanhas pagas (Meta Ads + Google Ads) para Triunfo, Allure e futuramente Allure Brooklyn. Verba de mídia é responsabilidade exclusiva do cliente. Cliente tem 3 DU para aprovar plano de mídia (tácito após).

| Entrega | Prazo NYO | Prazo cliente | Dono NYO |
|---|---|---|---|
| Setup técnico (pixel + GA4 + Conversions API + UTMs) | Inicia ao receber os acessos | --- | Caio |
| Plano de Mídia Mês 1 | Pronto para a onboarding | 3 DU para aprovação | Caio |
| Campanhas no ar | Após acessos + verba disponíveis nas plataformas | --- | Caio |
| Plano de Mídia mês seguinte | Pronto internamente até **dia 22**, envio ao cliente **dia 25** | 3 DU para feedback (até dia 28). Sem manifestação = aprovado tácito dia 30 | Caio + Marina |
| Relatório semanal de performance | Pronto sexta, envio toda **segunda até 10h** | --- | Caio + Marina |

---

## Pilar 03 · Tech

Agentes IA via WhatsApp, CRM, Dashboard, Sistema de Precificação Inteligente e 4 Landing Pages.

### Landing Pages (fluxo padrão)

Para cada LP, fluxo de duas etapas:

1. **Layout (protótipo visual)** → NYO entrega, cliente tem **3 DU** para aprovar ou pedir ajuste. Sem manifestação = aprovado tácito.
2. **Desenvolvimento em código + Homologação** → NYO entrega o site, cliente tem **5 DU** para apontar inconsistências. Sem manifestação = entrega aceita.

| Entrega | Prazo NYO (após aprovação do briefing) | Dono NYO |
|---|---|---|
| LP 1 Triunfo Campo Belo | **10 DU** | João Batista + Guilherme |
| LP 2 Allure Moema | **20 DU** | João Batista + Guilherme |
| LP 3 Institucional Courchevel | **30 DU** | João Batista + Guilherme |
| LP 4 Novo Premium | **40 DU** (e depende de naming + ID visual aprovados) | João Batista + Guilherme |

### Agentes IA e Sistemas

Cliente tem **5 DU** para homologar cada entrega após recebimento (tácito após).

| Entrega | Prazo NYO (após aprovação do briefing) | Dono NYO |
|---|---|---|
| Agente IA SDR (Triunfo + adaptação Allure) | **25 DU** | Lucas + Matheus |
| Agente IA Concierge (Allure + adaptação Premium) | **25 DU** | Lucas + Matheus |
| CRM (pipeline + integração com agentes) | **30 DU** | João Batista + Lucas |
| Dashboard de acompanhamento (tempo real, filtros) | **30 DU** | João Batista |
| Sistema de Precificação Inteligente (Allure) | A definir após onboarding e spec da Desbravador | Matheus + João Batista |

### Critérios de aceitação dos Agentes (do contrato)

**SDR:**
- Tempo de primeira resposta < 2 minutos em ao menos 95% dos testes.
- Coleta obrigatória: nome, renda estimada, prazo de compra, interesse.
- Classificação automática: quente ou frio.
- Encaminhamento ao corretor com resumo em até 5 minutos.
- Taxa de falha de interpretação < 5%.

**Concierge (4 fluxos):**
- Reserva: consulta + preço + política + confirmação.
- Pré check-in: coleta de dados com 24h de antecedência.
- Durante estadia: resposta em < 5 minutos em ao menos 95% dos casos.
- Pós saída: avaliação solicitada em até 2h após check-out + oferta de retorno em até 48h.

---

## Pilar 04 · Social Media

Criação e gestão de conteúdo para **2 perfis** de Instagram à escolha do cliente. Volumes não acumulam entre meses. Cliente tem **2 DU** para aprovar cada conteúdo finalizado (tácito após).

### Volumes contratuais (por perfil, por mês)

| Item | Volume / perfil | Total (2 perfis) |
|---|---|---|
| Reels | 6 | 12 |
| Posts estáticos | 4 | 8 |
| Posts institucionais | 2 | 4 |
| Stories | 12 a 20 | 24 a 40 |

### Fluxo mensal do calendário editorial (recorrente)

| Dia do mês | Evento |
|---|---|
| Dia 22 | NYO finaliza internamente plano de mídia + calendário editorial do mês seguinte |
| Dia 25 | Você envia ambos ao cliente |
| Até dia 28 | Cliente envia feedback consolidado |
| Dia 30 | Calendário considerado aprovado (com ou sem resposta) |
| A partir do dia 1º | Calendário bloqueado para alterações gratuitas |

### Bateria de Reels do Jhon

- 3 diárias/mês (1 por empreendimento).
- ~18 Reels por sessão.
- Material entregue em até 5 DU ao Guilherme.
- Estoque cobre 3 meses de Reels por empreendimento na primeira leva.

---

## Comunicação e relatórios (recorrente)

| Frequência | Entrega | Dono |
|---|---|---|
| Diário (até 19h) | EOD para o Gabriel | Você |
| Toda segunda (até 10h) | Relatório semanal ao cliente | Você + Caio |
| Toda sexta | Atualizar Sheets de Status + call com Gabriel 17h | Você |
| Dia 22 do mês | Plano de mídia + calendário fechados internamente | Caio + Gabriel |
| Dia 25 do mês | Envio ao cliente | Você |
| Dia 27 do mês | Lembrete D-2 se cliente não respondeu | Você |
| Dia 28 do mês | Verificar feedback do cliente; sem resposta = preparar aprovação tácita | Você |

---

## Pendências contratuais a resolver na semana 1

- Confirmar com cliente quais 2 perfis são os contratuais (Allure + Triunfo? Allure + Courchevelinc?).
- Confirmar ponto focal de aprovação por pilar (Brand, Tráfego, Tech, Social Media).
- Decisão sobre LinkedIn (cortesia operacional ou cobrar à parte).
- Coletar spec do PMS Desbravador para dimensionar a Precificação Inteligente.
- Receber briefings devolvidos preenchidos para iniciar contagem dos prazos contratuais.

---

## Como traduzir prazo relativo para data real no seu ClickUp

Quando o cliente aprovar formalmente cada briefing (mensagem "Aprovado" no grupo do WhatsApp):

1. Marque o briefing como aprovado no Sheets de Status.
2. No ClickUp, atualize a data de entrega das tarefas dependentes desse briefing: `data_aprovação_briefing + X DU` (onde X é o prazo contratual da tabela acima).
3. Defina automaticamente a data de Lembrete D-2 para 2 DU antes do prazo do cliente.

Exemplo: se o briefing das LPs for aprovado numa quinta-feira, a LP1 (10 DU) sai 2 semanas (10 dias úteis) depois, descontando finais de semana e feriados.
