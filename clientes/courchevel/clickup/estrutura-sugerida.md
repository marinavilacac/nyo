# Estrutura sugerida pro ClickUp · Projeto Courchevel

> Proposta inicial. Adapte conforme seu fluxo de trabalho.

---

## Estrutura macro

**Workspace:** NYO
**Space:** Clientes
**Folder:** Courchevel
**Lists dentro do folder:** 5 listas, uma por área temática

```
Workspace NYO
└── Space "Clientes"
    └── Folder "Courchevel"
        ├── List 01 · Operação Cliente (mapeamento + acessos + pendências)
        ├── List 02 · Tech (LPs + Agentes + CRM + Dashboard + Precificação)
        ├── List 03 · Tráfego (campanhas + relatórios)
        ├── List 04 · Brand (naming + ID visual + assets)
        └── List 05 · Social Media (calendário editorial + Reels)
```

---

## Status sugerido para todas as listas

Pipeline padrão de 6 status:

1. **Backlog** - tarefa criada mas não iniciada
2. **A iniciar** - dependências resolvidas, pode começar
3. **Em produção** - alguém da NYO trabalhando ativamente
4. **Aguardando cliente** - bola está com o cliente (aprovação, material, acesso)
5. **Aprovado / Concluído** - cliente aprovou ou o item está fechado
6. **Bloqueado** - precisa de decisão estratégica ou tem impedimento

---

## Campos customizados em todas as tarefas

| Campo | Tipo | Opções |
|---|---|---|
| Empreendimento | Dropdown | Allure / Triunfo / Courchevelinc / Cross / N/A |
| Pilar | Dropdown | Brand / Tráfego / Tech / Social Media / Operação |
| Dono NYO | Pessoa | Gabriel / Pedro / Lucas / Matheus / Caio / Ricardo / Vitor / Guilherme / João Batista / Gustavo / Jhon |
| Prazo cliente | Data | Quando o cliente precisa responder |
| Prazo NYO | Data | Quando NYO precisa entregar |
| Tipo de entrega | Dropdown | Layout / Homologação / Naming / Conteúdo / Relatório / Plano / Outro |
| Aprovação tácita? | Toggle | Se sim, marcou aprovação tácita registrada |

---

## Templates de tarefa recorrente

### Toda segunda (10h)
- "Enviar relatório semanal ao cliente"
- "Atualizar Sheets de Status do Projeto"

### Toda sexta (16h e 17h)
- "Atualizar Sheets de Status, fechar a semana"
- "Call semanal Gabriel × Marina, 17h"

### Todo dia útil (até 19h)
- "Enviar EOD para o Gabriel"

### Todo dia 22 do mês
- "Receber plano de mídia + calendário editorial finalizados internamente"

### Todo dia 25 do mês
- "Enviar plano de mídia + calendário editorial ao cliente"

### Todo dia 27 do mês
- "Verificar e disparar lembrete D-2 se cliente não respondeu"

### Todo dia 28 do mês
- "Verificar feedback do cliente. Sem resposta = preparar aprovação tácita."

---

## Automações recomendadas

Se o ClickUp permitir (versão paga):

1. **Quando status muda para "Aguardando cliente":** criar tarefa-filha automática "Lembrete D-2" agendada para 2 DU antes do prazo cliente.
2. **Quando prazo cliente vence sem mudança de status:** notificar Marina + mover para "Aprovado tácito" + criar tarefa "Enviar mensagem de aprovação tácita formal".
3. **Quando tarefa muda para "Aprovado":** registrar no Sheets de Aprovações (via Zapier ou similar).
4. **Toda sexta às 16h:** lembrar Marina de fechar Sheets de Status.

---

## Quem tem acesso ao ClickUp

| Pessoa | Permissão |
|---|---|
| Marina | Admin do projeto |
| Gabriel | Visualização + comentários |
| Pedro | Visualização + edição da List 03 (Tráfego) |
| João Batista | Visualização + edição da List 02 (Tech) |
| Lucas, Matheus | Visualização + edição da List 02 (Tech) |
| Caio, Ricardo, Vitor | Visualização + comentários na List 03 |
| Gustavo | Visualização + edição da List 04 (Brand) |
| Guilherme | Visualização + comentários em todas |
| Cliente Courchevel | **SEM ACESSO.** Comunicação é via WhatsApp + Drive. |

---

## Importação inicial

O arquivo [tarefas-30-dias.csv](tarefas-30-dias.csv) tem aproximadamente 60 tarefas pré-criadas com responsável e prazo (relativo a eventos do contrato, não datas fixas), prontas para importar via "Import CSV" no ClickUp. Faz isso na quinta da primeira semana (dia de setup interno).

Campos no CSV:
- Nome da tarefa
- Lista (qual das 5)
- Status
- Empreendimento
- Pilar
- Dono NYO
- Prazo NYO
- Prazo cliente
- Tipo de entrega
- Descrição

Após importar, ajuste responsáveis e datas conforme o cliente devolver os briefings (D contratual zero é o dia em que o briefing relevante for aprovado em escrita pelo cliente).
