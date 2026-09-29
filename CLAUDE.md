# Workspace NYO, Claude Code da Marina

> NYO (GM SOLUCOES LTDA) é a agência onde a Marina Vilaça trabalha como PM. Este repositório reúne o contexto de **todos os clientes** que ela atende no Claude Code, um por pasta em `clientes/`.

## Como este repositório está organizado

Cada cliente tem sua própria pasta em `clientes/<nome-do-cliente>/`, com o próprio `CLAUDE.md`. Ao trabalhar num cliente específico, entre na pasta dele (`cd clientes/<cliente>`) antes de abrir o Claude Code, ou peça pra Marina cite o cliente na primeira mensagem, pra carregar o contexto certo.

Skills também podem ser específicas de um cliente (ficam em `clientes/<cliente>/.claude/skills/`) e não devem ser usadas fora daquele contexto, salvo indicação explícita. Exceção: `.claude/skills/escrever-mensagem-cliente/` fica na raiz e vale para todos os clientes, é o motor comum de escrita de mensagem (tom, processo, formatação). Cada CLAUDE.md de cliente complementa esse skill com o que é específico dele (quem é, relacionamento, produtos, regras próprias).

## Clientes

| Pasta | Cliente | Resumo |
|---|---|---|
| [`clientes/courchevel/`](clientes/courchevel/CLAUDE.md) | Courchevel Inc | Incorporadora paulistana de alto padrão. Contrato de agência completo (Brand, Tráfego, Tech, Social). Relacionamento formal, Enzo é o decisor do dia a dia. |
| [`clientes/luiz/`](clientes/luiz/CLAUDE.md) | Luiz | Relacionamento próximo e informal (amigo). Precisa de clareza constante, alguma ansiedade sobre a NYO abandonar o projeto. Projetos: AICP, Gestor de Clones, Main Creative Hub. |
| [`clientes/arthur/`](clientes/arthur/CLAUDE.md) | Arthur | A NYO é a fonte principal de renda dele. Perfil animado, vibrante, gosta de comemoração e carinho no tom. Projeto: Do Ventre ao Peito. |
| [`clientes/dea-e-tiba/`](clientes/dea-e-tiba/CLAUDE.md) | Déa e Tiba | Assessorados pelo José, que protege os dois e ainda está aprendendo marketing digital. Precisa de segurança demonstrada o tempo todo. Projeto: Index App. |

## Regra geral entre clientes

Não misturar contexto, tom ou dados de um cliente na conversa de outro. Cada pasta é autocontida. Informação sensível (senhas, tokens, dados pessoais de terceiros) não entra em nenhum CLAUDE.md, nem daqui nem dos clientes.

Luiz, Arthur e Déa & Tiba são "experts" no sentido da Casa de Copy (criadores com produto próprio, operados pela NYO em regime de agência/lançamento). O conteúdo dos CLAUDE.md deles vem do "Guia dos Experts" (Braian, copy estrategista) e é **uso interno da equipe, nunca repassado aos próprios experts**. O Arthur em particular exige que nenhum material endereçado a ele cite qualquer outra conta da casa.

## Metodologia Casa de Copy (Luiz, Arthur, Déa & Tiba)

Regras que valem para os três experts, vindas do "Guia dos Experts":

1. **Quem decide o quê.** O operador decide estratégia, preço e funil. O expert aprova a própria voz e tem veto. A NYO produz, sobe e mede.
2. **Aprovado não é validado.** Aprovado é quando o operador ou o expert gostou. Validado é quando rodou com dinheiro, contra um controle, e bateu a meta.
3. **Todo ROAS tem uma régua.** O ROAS do gerenciador, o da DRE (lucro real) e o de benchmark são números diferentes. Antes de repetir um número, perguntar de qual régua ele é.
