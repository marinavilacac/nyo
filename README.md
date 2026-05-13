# Pacote Marina · Projeto Courchevel

> Tudo que você precisa pra cuidar da gestão de projetos do Courchevel na NYO.
>
> Recebido em 11/05/2026 · Material vivo, vai evoluir conforme o projeto anda.

---

## Como instalar na sua máquina

1. **Salve esta pasta** em qualquer lugar do seu Mac (ex: `~/Documents/NYO-Courchevel/` ou seu Drive).
2. **Abra a pasta no Finder** para ver o conteúdo organizado.
3. **Se você usa o Claude Code (CLI)**: abra o Terminal dentro desta pasta e rode `claude`. O Claude vai carregar automaticamente o arquivo `CLAUDE.md` que explica o projeto inteiro. A partir daí você pode fazer perguntas, gerar atas, escrever mensagens pro cliente, atualizar status do projeto.
4. **Se você ainda não usa o Claude Code**: tudo aqui é legível direto. Abra o `Painel-Marina.html` no navegador e os `.md` no Notion, Obsidian, Typora ou qualquer editor.

---

## Por onde começar

Leia nesta ordem (15-20 minutos no total):

1. **[00-comece-aqui/walkthrough.md](00-comece-aqui/walkthrough.md)** : tour de 5 minutos.
2. **[00-comece-aqui/Painel-Marina.html](00-comece-aqui/Painel-Marina.html)** : abra no navegador, visão geral do time e do escopo em 2 abas.
3. **[02-empreendimentos/](02-empreendimentos/)** : 3 documentos curtos, um por empreendimento (Allure, Triunfo, Courchevel).
4. **[03-entregas-prazos/](03-entregas-prazos/)** : o que tem que ser entregue, quando e por quem.
5. **[04-comunicacao-cliente/](04-comunicacao-cliente/)** : templates de mensagens prontas e regras de aprovação.
6. **[00-comece-aqui/prompts-prontos.md](00-comece-aqui/prompts-prontos.md)** : prompts pra colar no Claude e resolver tarefas rapidamente.

---

## Estrutura desta pasta

```
.
├── README.md                            (este arquivo)
├── CLAUDE.md                            (lido automaticamente pelo Claude Code)
├── 00-comece-aqui/
│   ├── Painel-Marina.html               (visão geral em 2 abas)
│   ├── walkthrough.md                   (tour de 5 minutos)
│   └── prompts-prontos.md               (atalhos pro Claude)
├── 01-time/
│   └── quem-faz-o-que.md                (organograma + como cobrar cada um)
├── 02-empreendimentos/
│   ├── allure.md                        (Allure Moema, short + long stay)
│   ├── triunfo.md                       (Triunfo Campo Belo, venda + long stay)
│   └── courchevel.md                    (Courchevel Inc, institucional)
├── 03-entregas-prazos/
│   ├── pilares-e-entregas.md            (Brand, Tráfego, Tech, Social Media)
│   └── linha-do-tempo.md                (datas-âncora dos 30 dias)
├── 04-comunicacao-cliente/
│   ├── templates-whatsapp.md            (BOAS-VINDAS, LEMBRETE D-2, etc.)
│   └── regras-de-aprovacao.md           (escrito sempre, tácito após prazo)
└── 05-clickup-starter/
    ├── estrutura-sugerida.md            (boards, listas e status pro ClickUp)
    └── tarefas-30-dias.csv              (importável direto no ClickUp)
```

---

## Princípios que valem pra tudo

1. **Você é o único ponto de contato com o cliente.** Toda comunicação externa passa por você.
2. **Aprovação verbal não vale.** Toda call termina com mensagem de confirmação pedindo "Confirmado" escrito do cliente.
3. **Lembrete D-2 sistemático.** 2 dias antes de qualquer prazo do cliente, você dispara o lembrete.
4. **Aprovação tácita é formal.** Se prazo do cliente vence sem resposta, você manda mensagem formal registrando a aprovação automática e segue.
5. **EOD para o Gabriel todo dia útil até 19h** em grupo privado dos 2.
6. **Sheets de Status sempre atualizado** (a sua planilha de controle).

---

## Em caso de dúvida

- Sobre o cliente, o produto, o time: tudo está nesta pasta.
- Sobre uma decisão estratégica: pergunta ao Gabriel no grupo dos 2.
- Sobre uma decisão técnica: pergunta ao Lucas (agentes), João Batista (LPs/CRM/Dashboard) ou Matheus (precificação).
- Sobre tráfego: Pedro.
- Sobre design e visual: Guilherme.
- Sobre branding: Gustavo.

Detalhes em [01-time/quem-faz-o-que.md](01-time/quem-faz-o-que.md).
