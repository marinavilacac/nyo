# Linha do tempo do projeto

> O projeto NÃO se organiza por datas fixas no calendário. Se organiza por **sequência de eventos** que destravam as próximas entregas. Este documento mostra essa cadeia.

---

## Como ler este documento

Cada “fase” do projeto começa com um **evento-gatilho** (onboarding, briefing aprovado, naming aprovado, etc.) e termina com o próximo evento-gatilho. Os prazos relativos do contrato (10 DU, 20 DU, 25 DU, etc.) começam a contar a partir desses gatilhos.

Você não precisa adivinhar datas. Você precisa garantir que cada gatilho seja registrado por escrito e disparar o cronômetro do próximo.

---

## Fase 0 · Pré-onboarding

**Duração:** dias antes da reunião de onboarding.

| Evento | Quem dispara |
|---|---|
| Drive criado e estruturado, pronto para compartilhar com cliente | NYO |
| Grupo WhatsApp oficial criado | Marina |
| Sheets de Status do Projeto + Aba Aprovações pronto | Marina |
| Templates de WhatsApp prontos (referência: `comunicacao cliente/templates-whatsapp.md`) | Marina |
| Plano de Mídia Mês 1 pronto para apresentar | Caio + Gabriel |
| Agenda da onboarding finalizada | Gabriel + Marina |
| Briefings de naming, ID visual e Agentes IA prontos para entregar ao cliente | Gustavo + Lucas |

---

## Fase 1 · Onboarding · D operacional zero

**Evento-gatilho:** reunião de onboarding com o cliente.

**O que acontece na onboarding:**
- Apresentação do time NYO ao cliente.
- Apresentação dos 4 pilares e do cronograma macro.
- Imersão de Branding (Gustavo conduz, bloco específico).
- Mapeamento de stakeholders preenchido ao vivo (quem aprova o quê).
- Critérios de sucesso do Mês 1 registrados em ata.
- Briefings entregues ao cliente para devolução.

**O que você dispara em até 1h após a reunião:**
- Mensagem de confirmação pós-call no grupo do WhatsApp pedindo “Confirmado” escrito.
- Ata da reunião enviada ao Drive + link no grupo.
- [BOAS-VINDAS] no grupo.
- [SOLICITAÇÃO DE ACESSOS] no grupo.

**O que sai como early-win na semana 1 (independente do cliente):**
- Roteiros de criativos primeira semana (Gabriel).
- Brandbook operacional dos 3 empreendimentos (Guilherme).
- [INSIGHT DE CONCORRÊNCIA] no grupo (insumo do Caio).

---

## Fase 2 · Aguardando briefings devolvidos

**Evento-gatilho de saída:** cliente devolve cada briefing por escrito (“Aprovado” no grupo).

**Estado do projeto nesta fase:**
- O time NYO avança internamente no que não depende do cliente: arquitetura técnica, layouts de LP, banco de referência visual, setup de pixel/GA4 quando acessos chegarem.
- O **cronômetro contratual está parado**. Os 10 DU da LP1, os 25 DU dos agentes, os 30 DU do CRM/Dashboard NÃO começam a contar até o briefing correspondente ser aprovado.
- Você cobra acessos ainda pendentes (chase amigável).

**Marina nesta fase:**
- [LEMBRETE D-2] dos briefings (2 DU antes do prazo de devolução combinado na onboarding).
- Acompanha cliente diariamente sobre acessos faltantes.
- Atualiza Sheets de Status.
- EOD diário ao Gabriel sinalizando o que está bloqueado.

---

## Fase 3 · Sprint Tech · Após briefings aprovados

**Evento-gatilho:** briefings aprovados em escrita pelo cliente. **A partir daqui, os prazos contratuais começam a contar.**

### Sequência típica de entregas (todos os prazos em DU = dias úteis após aprovação do briefing relevante):

```
Aprovação briefing
        │
        ├── +10 DU ──► LP 1 Triunfo entregue ao cliente para homologação
        │                       └── cliente: 5 DU para apontar inconsistências
        │
        ├── +20 DU ──► LP 2 Allure entregue
        │                       └── cliente: 5 DU
        │
        ├── +25 DU ──► Agente SDR entregue
        │                       └── cliente: 5 DU
        │
        ├── +25 DU ──► Agente Concierge entregue
        │                       └── cliente: 5 DU
        │
        ├── +30 DU ──► LP 3 Institucional entregue
        │                       └── cliente: 5 DU
        │
        ├── +30 DU ──► CRM entregue
        │                       └── cliente: 5 DU
        │
        ├── +30 DU ──► Dashboard entregue
        │                       └── cliente: 5 DU
        │
        └── (cada layout de LP exige 3 DU de aprovação cliente antes do desenvolvimento entrar em código)
```

### Fluxo de cada LP

Cada Landing Page tem 2 momentos de aprovação cliente:

```
Início ──► [Produção interna do layout] ──► Layout ao cliente
                                                    │
                                                    └── 3 DU cliente aprovar ou pedir ajuste
                                                                │
                                                                ▼
                                          [Desenvolvimento em código] ──► Homologação ao cliente
                                                                                    │
                                                                                    └── 5 DU cliente testar
                                                                                                │
                                                                                                ▼
                                                                                            LP ATIVA
```

---

## Fase 4 · Naming Premium · Após briefing de naming aprovado

**Evento-gatilho:** briefing de naming aprovado em escrita pelo cliente (na onboarding ou logo após).

```
Aprovação briefing naming
        │
        ├── NYO interno: pesquisa + geração de 30+ opções + filtro
        │
        └── +10 DU ──► 3 a 5 propostas finais entregues ao cliente
                        │
                        └── 5 DU cliente escolher (ou aprovação tácita)
                                        │
                                        ▼
                          NAMING APROVADO → libera identidade visual
                                        │
                                        ├── +15 DU ──► Identidade visual proposta inicial
                                        │                       │
                                        │                       └── 5 DU cliente feedback por rodada (3 rodadas inclusas)
                                        │
                                        └── (após ID visual aprovada)
                                                │
                                                └── +5 DU ──► Assets digitais entregues
```

---

## Fase 5 · Operação recorrente · A partir do mês 2

**Evento-gatilho:** todas as entregas iniciais homologadas, projeto em ritmo de cruzeiro.

Cadência mensal recorrente:

| Dia do mês | Ação | Dono |
|---|---|---|
| Dia 22 | Plano de mídia + calendário editorial fechados internamente | Caio + Gabriel |
| Dia 25 | Você envia ambos ao cliente | Marina |
| Dia 27 | Lembrete D-2 se cliente não respondeu | Marina |
| Dia 28 | Verifica feedback; sem resposta = prepara aprovação tácita | Marina |
| Dia 30 | Calendário e plano oficialmente aprovados (tácito ou expresso) | --- |
| Dia 1º | Bloqueio para alterações gratuitas | --- |

Cadência semanal recorrente:

| Frequência | Ação | Dono |
|---|---|---|
| Toda segunda até 10h | Relatório semanal ao cliente | Marina + Caio |
| Toda sexta 17h | Call interna Marina × Gabriel (30 min) | Marina |
| Toda sexta | Atualizar Sheets de Status | Marina |
| Todo dia útil 19h | EOD da Marina para o Gabriel | Marina |

---

## O que NÃO está nesta linha do tempo

- **Datas absolutas no calendário.** Tudo é relativo a eventos porque o contrato é relativo a eventos.
- **Promessa de quando algo sai.** Só sai depois do gatilho. Se o cliente atrasar a aprovação do briefing, todo o resto desloca.
- **Compromisso de antecipar entrega.** Se quiser antecipar, NYO pode tentar, mas não compromete. O contrato é o limite.

---

## Sua função no controle da linha do tempo

1. **Registrar cada evento-gatilho** no Sheets de Status assim que acontecer (briefing aprovado, naming aprovado, acessos liberados, verba disponível).
2. **Cravar a data real de cada entrega no ClickUp** baseado em `data_do_gatilho + X DU` (X vem do contrato).
3. **Disparar Lembrete D-2 sistemático** antes de cada prazo do cliente.
4. **Registrar aprovação tácita formal** quando prazo do cliente vencer sem manifestação.
5. **Reportar no EOD diário** para o Gabriel qualquer evento-gatilho que aconteceu e qualquer que está atrasado.
