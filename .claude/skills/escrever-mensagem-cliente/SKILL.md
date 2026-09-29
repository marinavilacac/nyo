---
name: escrever-mensagem-cliente
description: Escreve, organiza ou ajusta mensagens de WhatsApp (ou reports, respostas, check-ins) para QUALQUER cliente da NYO, ou para o time interno. Use sempre que a Marina pedir pra "escrever uma mensagem", "organizar isso pro cliente", "responde pro X", "transforma esse report em mensagem", "resume esse áudio e transforma em mensagem", ou colar dados brutos (print, áudio transcrito, planilha, texto de outro membro do time) pedindo uma mensagem pronta. Skill de raiz do workspace, vale pra todos os clientes em clientes/. Combine sempre com o CLAUDE.md do cliente específico (tom e fatos de negócio ficam lá; aqui fica o "como escrever").
---

# Escrever mensagem de cliente, NYO

> Destilado de ~4 meses (479 mensagens, 14/05 a 28/09/2026) de iteração da Marina com um assistente até o tom ficar "redondinho". Isto é o motor de escrita. O CLAUDE.md de cada cliente em `clientes/<cliente>/` dá o "quem" (tom específico, relacionamento, produtos); este skill dá o "como".

## Quando ativar

Qualquer pedido de mensagem de WhatsApp, pra cliente ou pra time interno: bom dia, report semanal, entrega com pedido de aprovação, resposta a reclamação ou pergunta, cobrança de aprovação pendente, resumo de áudio/transcrição virando demanda, check-in pro time. Também vale pra mensagens fora do WhatsApp que sigam o mesmo registro (e-mail curto, por exemplo), mas o formato de link e quebra em várias mensagens é específico de WhatsApp.

## O processo, não só o resultado

1. **Insumo bruto entra como está.** Print de conversa, áudio transcrito, texto de outro membro do time (tráfego, tech, design), dado de planilha. Não pedir pra Marina reformular antes, o trabalho de traduzir é seu.
2. **Devolver rascunho direto**, já tentando aplicar o tom certo pro destinatário (ver "Três registros" abaixo). Não interromper com perguntas de esclarecimento a não ser que falte algo que não dá pra inventar (link, data, número). Nesse caso, usar `[INSERIR LINK]` / `[INSERIR DATA]` e seguir.
3. **Assunto sensível ou de conflito (reclamação, questionamento técnico, decisão delicada): duas etapas.** Primeiro dar uma leitura interpretativa em texto normal ("Ele está pedindo X, Y e Z" / "Resumindo, ela quer dizer que..."). Só escrever a mensagem final depois que a Marina confirmar ou corrigir essa leitura. Não pular direto pra mensagem pronta quando o conteúdo é delicado.
4. **Correção da Marina é sempre cirúrgica.** Ela aponta o problema específico ("ficou com cara de erro nosso", "esse travessão também não dá", "deixa mais direto") e espera ajuste pontual, preservando o resto. Nunca reescrever do zero quando ela pede um ajuste localizado.
5. **Múltiplos assuntos ou destinatários: separar, não empacotar.** Se o conteúdo tem temas distintos (ex.: Triunfo / Allure / Tech) ou vai pra públicos diferentes (grupo do cliente / privado de alguém / grupo interno), separar em Mensagem 1 / 2 / 3 por tema ou por destinatário. Exceção: Tech pode abrir uma mensagem como "manchete" com Allure e Triunfo em bullets abaixo, na mesma mensagem, quando o pilar de tecnologia é o fato principal da rodada.
6. **Report de tráfego/tech recebido em "linguagem de time" vira "linguagem de agência".** O que o Caio, o Matheus ou outro especialista manda costuma estar em 1ª pessoa individual, com jargão interno e bullets redundantes. Traduzir pra 1ª pessoa plural ("fizemos", "entregamos"), sem jargão, sem repetir estrutura.
7. **Sem checklist formal, mas dois hábitos substituem um:** (a) todo link está por extenso, colável, nunca resumido ou em markdown; (b) a saudação bate com o horário e com "mensagem nova" vs. "continuação" (ver abaixo).

## Mensagem nova vs. continuação

Se o conteúdo é resposta imediata a algo que a própria NYO acabou de mandar minutos antes (um complemento, um adendo), não repetir saudação nem reintroduzir contexto: seguir direto, pode usar @menção. Se é assunto novo, puxado por outro gatilho (mesmo que no mesmo dia), tem abertura própria com saudação adequada ao horário.

## Regras de tom

Regras absolutas, valem pra qualquer cliente salvo indicação contrária no CLAUDE.md dele:

1. **Direta e prática.** Mensagem curta, sem textão, sem rodeio.
2. **Puxar resposta.** Fechar pedidos de retorno com pergunta específica ("Qual horário funciona melhor amanhã?"), nunca "ficamos no aguardo".
3. **Report, não comemoração.** Os números falam sozinhos, mesmo quando o resultado é bom. Nada de "evolução muito positiva", "resultado incrível".
4. **Feito, não fazendo, com critério de causa real.** Gerúndio só se a ação está de fato em curso agora. Se depende de uma etapa anterior ainda não concluída, usar futuro: "assim que o editor finalizar, o Gustavo fará a revisão final", nunca "o Gustavo está fazendo a revisão" se ele ainda nem começou.
5. **Autoridade, sem provisoriedade.** Afirmar o que foi feito primeiro, pedir confirmação como formalidade, não como avaliação aberta. Trocar "queria entender se está seguindo a linha que você imaginava" por "a ideia foi seguir exatamente o que alinhamos, queria validar contigo antes de seguirmos".
6. **Falha técnica ou de terceiro nunca soa como erro nosso.** Trocar o sujeito da frase: de "ação da equipe que falhou" para "estado do sistema/acesso". "Não conseguimos concluir o login" vira "os acessos do Instagram não estavam funcionando".
7. **Atraso por erro interno: comunicar o atraso e o novo prazo, nunca a causa constrangedora nem uma causa falsa.** Pode descrever como parte do refinamento normal ("estamos fazendo os ajustes finais pra fechar o material da melhor forma"), sem nomear o motivo real e sem inventar outro. Nunca pedir desculpas de forma que soe a um "migué".
8. **Cobrança é sempre calibrada, nunca no automático.** Intensidade é parâmetro explícito (reforço leve vs. pressão visível com cuidado). Sem instrução em contrário, usar reforço leve, embutido dentro de um report ou atualização, mostrando o que depende daquela aprovação. Nunca cobrar isolado, sem contexto.
9. **Sem condescendência.** "Queria pedir uma ajudinha" não. "Só pra gente organizar melhor o fluxo" sim.
10. **Linguagem de time pro cliente: "fizemos", "entregamos", "estruturamos", "vamos".** Quem não esteve presente, citar quem fez.
11. **Não repetir de volta o que a pessoa acabou de dizer** ao responder uma mensagem dela.
12. **Perguntas técnicas já filtradas.** Antes de perguntar algo técnico, pensar no problema o suficiente pra não fazer pergunta genérica que gere resposta inútil. Contextualizar antes de perguntar, principalmente se é repasse de um apontamento de terceiro que não ficou claro.
13. **Tom mais animado só em ocasião especial, incluindo quando o interlocutor abre nesse tom primeiro.** Se o cliente ou parceiro externo usa tom empolgado/informal antes, pode espelhar o registro dele. Fora isso, o padrão é sóbrio e caloroso.
14. **Resumir fala de terceiros (áudio, mensagem longa) com fidelidade antes de fluidez.** Se há qualquer dúvida sobre o que a pessoa quis dizer, marcar a incerteza ou pedir a fonte literal. Nunca inverter ou editorializar o sentido pra soar melhor.
15. **Separar sempre "o quê" (report) de "por quê / o que faremos" (reunião ou conversa dedicada).** Relatório de rotina não leva diagnóstico qualitativo profundo nem exemplos individuais (nomes de leads, casos específicos). Isso é pauta de reunião.

### Três registros, mesma pessoa

Quem escreve é sempre a Marina, mas o registro muda conforme quem lê:

- **Cliente:** o padrão acima inteiro, sóbrio e caloroso.
- **Time interno da NYO:** mais direto e menos formal. Usa @menção nominal, pede resposta "ponto a ponto" em bullet, cobra prazo específico ("me respondam ponto a ponto pra eu conseguir atualizar o cliente").
- **Parceiro externo animado que abre empolgado primeiro** (ex.: um desafio ou pedido informal de alguém do lado do cliente): pode espelhar o tom dele, com mais emoji e leveza. É a exceção "ocasião especial" da regra 13.

### Palavras e construções banidas

Travessão (—). "Aproveitando" / "aproveito para" / "complementando" como conector de assunto novo dentro do mesmo parágrafo — cada assunto novo abre com conector temático curto ("Sobre X:", "Também...") ou direto, nunca com essas muletas. "Frentes", "frente de tecnologia". "Seguimos avançando". "Hoje foi realizada" (burocrático). "Implementação" pra site (dizer "site no ar"). "Follow up" escrito por extenso. "Qualquer coisa, estamos aqui". "Segue também" quando é mensagem nova. "Novamente" em agradecimento. Subtítulos tipo boletim em maiúsculas.

**Abrir mensagens recorrentes sempre igual é o erro mais cobrado ao longo de toda a conversa original, do início ao fim.** Não é correção pontual, é vigilância contínua: antes de mandar qualquer mensagem de cadência fixa (bom dia diário, report semanal), checar se a abertura já foi usada recentemente e variar. Banco de aberturas pra girar: "Pessoal, sobre o tráfego: …", "Fechando a semana, …", "Pessoal, compartilhando um status de …", "Pessoal, uma novidade por aqui: …", "Pessoal, fechamos uma etapa importante hoje: …", "Rodrigo, vi sua mensagem! …". Preferir abrir já entregando o tema principal em vez de "passando uma atualização rápida".

## Formatação, WhatsApp

1. **Link sempre como URL crua, numa linha própria, precedida de 👉. Nunca em markdown, nunca encurtado, nunca como hyperlink de texto.** Isto é o erro técnico mais recorrente do assistente ao longo de toda a conversa original: a tendência automática é formatar link bonito (estilo `[texto](url)` ou "urlDashboard"), e isso quebra ao colar no WhatsApp porque o link some. Tratar como regra de bloqueio, não como preferência de estilo. Sem link ainda: `👉 [INSERIR LINK]`.
2. Entrega no Figma: instruir abrir pelo computador e apertar **Z** pra ajustar o zoom; se tiver várias versões ou páginas, explicar a navegação pelas setas.
3. Conteúdo grande ou com temas diferentes: Mensagem 1 / Mensagem 2 / Mensagem 3, cada uma curta e independente. Ajuste pedido numa delas: reenviar o conjunto inteiro, pronto pra copiar.
4. Bullets para listas de entregas, números ou pedidos. Negrito com moderação.
5. Saudação de acordo com o horário (bom dia / boa tarde / boa noite, após 18h é boa noite). Ver "mensagem nova vs. continuação" acima antes de decidir se repete saudação.
6. Entregar só a mensagem pronta pra copiar. Comentário ou sugestão da IA, no máximo uma linha fora do bloco.

### Emojis

☺️ sorriso padrão de abertura. 🤍 fechamento carinhoso. 👉 sempre antes de link. 🚀 pontual, entregas e marcos. ✨ 💫 com moderação. Nunca 🙂 (irônico) nem 🥺 (pidão). Máximo 1 a 3 por mensagem, exceto no registro "parceiro externo animado" acima.

## Tipos de mensagem com esqueleto próprio

**Bom dia / início de semana.** Saudação + votos de boa semana + uma frase avisando o que será enviado ainda hoje. Nunca listar entregas específicas se não tiver certeza de que existem, só a visão geral da semana.

**Report de tráfego (rotina fixa, geralmente segunda e sexta).** Investimento total → métrica principal (leads/conversas) e custo médio → quebra por projeto em bullets → comparação percentual com período anterior → opcionalmente, próximo ajuste ou plano. Sem adjetivo no resultado, nem quando é bom.

**Report de tech/produto.** Abre pelo item que tem atualização real; item sem novidade se omite, a não ser que peçam explicitamente listar "sem novas atualizações desde o último report" por item, pra dar visão de continuidade.

**Entrega + pedido de aprovação.** Nome do material → link (👉 + URL crua) → 1 a 2 frases de contexto ou instrução de uso (Figma: tecla Z, setas) → fechamento com pergunta específica de aprovação, nunca "ficamos no aguardo".

**Cobrança de aprovação pendente.** Nunca isolada: embutida dentro de um report ou atualização, citando o que depende daquela aprovação pra destravar. Intensidade regulável por instrução explícita.

**Resposta a reclamação ou questionamento técnico.** Reconhecer o pedido em uma frase curta, depois indicar direto o que muda ou será feito. Sem se justificar longamente, sem repetir o histórico do problema, sem repetir o que a pessoa disse.

**Mensagem pro time interno.** Mais direta, @menção nominal, pede resposta ponto a ponto, prazo específico.

**Pedido de mudança de comportamento a um contato do cliente** (ex.: pedir pra concentrar demandas num canal só). Tom de igual pra igual, nunca condescendente.

## Como isto se combina com o CLAUDE.md do cliente

Este skill dá o motor comum. Antes de escrever, ler o `clientes/<cliente>/CLAUDE.md` correspondente pra pegar: quem é o destinatário, o relacionamento (formal, próximo, ansioso, etc.), produtos e fatos de negócio, e qualquer regra específica daquele cliente (ex.: Courchevel tem regras de aprovação contratuais próprias em `clientes/courchevel/comunicacao cliente/`, Arthur exige nunca citar outra conta da casa). Regra específica de cliente sempre prevalece sobre a regra geral deste skill quando conflitarem.
