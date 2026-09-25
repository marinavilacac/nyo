# Workspace NYO, Claude Code da Marina

> NYO (GM SOLUCOES LTDA) é a agência onde a Marina Vilaça trabalha como PM. Este repositório reúne o contexto de **todos os clientes** que ela atende no Claude Code, um por pasta em `clientes/`.

## Como este repositório está organizado

Cada cliente tem sua própria pasta em `clientes/<nome-do-cliente>/`, com o próprio `CLAUDE.md`. Ao trabalhar num cliente específico, entre na pasta dele (`cd clientes/<cliente>`) antes de abrir o Claude Code, ou peça pra Marina cite o cliente na primeira mensagem, pra carregar o contexto certo.

Skills também podem ser específicas de um cliente (ficam em `clientes/<cliente>/.claude/skills/`) e não devem ser usadas fora daquele contexto, salvo indicação explícita.

## Clientes

| Pasta | Cliente | Resumo |
|---|---|---|
| [`clientes/courchevel/`](clientes/courchevel/CLAUDE.md) | Courchevel Inc | Incorporadora paulistana de alto padrão. Contrato de agência completo (Brand, Tráfego, Tech, Social). Relacionamento formal, Enzo é o decisor do dia a dia. |
| [`clientes/luiz/`](clientes/luiz/CLAUDE.md) | Luiz | Relacionamento próximo e informal (amigo). Precisa de clareza constante, alguma ansiedade sobre a NYO abandonar o projeto. Projetos: AICP, Gestor de Clones, Main Creative Hub. |
| [`clientes/arthur/`](clientes/arthur/CLAUDE.md) | Arthur | A NYO é a fonte principal de renda dele. Perfil animado, vibrante, gosta de comemoração e carinho no tom. Projeto: Do Ventre ao Peito. |
| [`clientes/dea-e-tiba/`](clientes/dea-e-tiba/CLAUDE.md) | Déa e Tiba | Assessorados pelo José, que protege os dois e ainda está aprendendo marketing digital. Precisa de segurança demonstrada o tempo todo. Projeto: Index App. |

## Regra geral entre clientes

Não misturar contexto, tom ou dados de um cliente na conversa de outro. Cada pasta é autocontida. Informação sensível (senhas, tokens, dados pessoais de terceiros) não entra em nenhum CLAUDE.md, nem daqui nem dos clientes.
