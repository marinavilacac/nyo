# Prompts prontos para o Claude

> Copie, cole no Claude Code (aberto nesta pasta), ajuste o que tiver entre `[colchetes]`.
>
> O Claude já tem o contexto carregado pelo `CLAUDE.md` desta pasta, então as respostas saem no tom certo.

---

## 1. Gerar EOD para o Gabriel

```
Me ajude a montar o EOD de hoje pro Gabriel.

Entregas concluídas hoje:
- [item 1]
- [item 2]

Em produção pra amanhã:
- [item 1]
- [item 2]

Blockers:
- [bloqueio]

Cliente atrasado:
- [item, X dias]

Mídia (se disponível):
- gasto acumulado: R$ [valor]
- leads: [número]
- CPL: R$ [valor]

Gera no formato padrão, curto, 3 minutos de leitura.
```

---

## 2. Gerar ata pós-reunião

```
Me ajude a redigir a ata da reunião que terminou agora.

Data: [DD/MM/AAAA]
Presentes (NYO): [nomes]
Presentes (Courchevel): [nomes]

Pontos discutidos:
- [tópico 1: o que foi decidido]
- [tópico 2: o que foi decidido]

Pendências geradas:
- [item, responsável, prazo]

Próximos passos:
- [item, quem, quando]

Formato: tabela de decisões + tabela de pendências + parágrafo curto de próximos passos. Vou enviar pelo Drive e pedir Confirmado no grupo.
```

---

## 3. Mensagem de confirmação pós-call

```
Acabamos uma call com o cliente. Me ajude a escrever a mensagem de
confirmação que vou enviar AGORA no grupo do WhatsApp, dentro de 1h.

Decisões aprovadas na call:
- [item 1]
- [item 2]

Pendências com prazo:
- [item, responsável, prazo]

Link da ata no Drive: [colar quando tiver]

Estilo: profissional caloroso, sem emojis em excesso, termina pedindo
"Confirmado" escrito pra registro.
```

---

## 4. Lembrete D-2

```
O cliente tem prazo até [DD/MM] para aprovar [entrega X].
Hoje é [DD/MM] (D-2). Me ajude a escrever o lembrete amigável mas firme,
citando a regra de aprovação tácita.
```

---

## 5. Aprovação tácita formal

```
O prazo do cliente para aprovar [entrega X] venceu hoje, [DD/MM], sem
manifestação. Me ajude a escrever a mensagem formal registrando a
aprovação automática conforme contrato, e avisando que seguimos para a
próxima etapa.
```

---

## 6. Relatório semanal pro cliente

```
Me ajude a montar o relatório semanal para enviar na segunda-feira até as
10h.

Período: [DD/MM] a [DD/MM]

Tráfego (dados do Pedro):
- [colar números]

Social Media:
- posts publicados: [número]
- alcance: [número]
- engajamento: [%]

Tech:
- [status atual de SDR / Concierge / LPs]

Brand:
- [status atual de naming / ID visual]

Próxima semana:
- [entrega X, data]
- [entrega Y, data]

Call agendada: [dia, hora, link]

Estilo: relatório executivo, escaneável em 2 minutos, dados em destaque,
próximos passos claros. Vou enviar no grupo do cliente.
```

---

## 7. Pedido de material ao cliente

```
Preciso pedir ao cliente os seguintes materiais para a próxima entrega:

Material:
- [lista]

Prazo: [data]

Por que precisa: [breve contexto]

Risco se não chegar: [ex: cancelamento do item no mês corrente]

Me ajude a escrever a mensagem firme mas educada, conforme o tom NYO.
```

---

## 8. Status do projeto agora (sem olhar arquivo nenhum)

```
Me dá o status atual do projeto Courchevel: o que já foi entregue, o que
está em produção, o que está bloqueado, o que vence essa semana, e quais
pendências do cliente estão em aberto. Olha os arquivos da pasta para
basear a resposta, não invente. Se faltar info, diga "não tenho esse
dado, perguntar pro Gabriel".
```

---

## 9. Quem é responsável por isso?

```
Quem do time NYO é responsável por [tarefa, ex: editar Reels do Allure,
revisar copy de anúncio, configurar pixel Meta]? Como eu cobro essa
pessoa? Qual a cadência esperada de entrega?
```

---

## 10. Prepara minha próxima call com o Gabriel

```
Sexta é minha call semanal com o Gabriel às 17h. Me ajude a preparar a
pauta com base no que está em aberto no projeto: blockers que precisam de
decisão dele, status dos pilares, pendências do cliente, riscos da próxima
semana. Formato: lista de tópicos com tempo estimado de discussão para
caber em 30 min.
```

---

## Atalhos: o que NÃO pedir pro Claude

- **Dado de mensalidade NYO, custo interno, margem**: não está na pasta e eu não devo ter acesso. Se o Claude inventar algum número, ignora.
- **Decisão estratégica final**: o Claude pode sugerir, mas a decisão é do Gabriel.
- **Mensagem agressiva ou ríspida pro cliente**: nunca. Sempre profissional caloroso, mesmo em cobrança.
