# Processo de Desenvolvimento

## Processo escolhido: Kanban

Board no GitHub Projects: https://github.com/users/evmdo-prog/projects/3/views/1

## Características do Kanban
- Fluxo contínuo de trabalho, sem iterações de tamanho fixo.
- Trabalho visualizado em colunas, que representam as etapas do fluxo.
- Limite de trabalho em andamento (WIP): poucas tarefas ao mesmo tempo.
- Prioridades podem mudar a qualquer momento, sem esperar o fim de uma iteração.
- Não exige papéis fixos nem cerimônias formais.

## Por que o Kanban é adequado a este projeto
- O projeto é desenvolvido por uma única pessoa. Scrum pressupõe um time
  com Product Owner, Scrum Master e cerimônias, que não fazem sentido aqui.
- As cinco funcionalidades são relativamente independentes e podem ser
  entregues uma a uma.
- Os prazos são definidos por parte do projeto, e não por sprints. O fluxo
  contínuo se adapta melhor a isso.
- Limitar o trabalho em andamento evita começar várias funcionalidades e
  não terminar nenhuma.

## Colunas do board
| Coluna | Significado |
|--------|-------------|
| Backlog | Funcionalidades solicitadas, ainda não iniciadas |
| Ready | Pronta para ser iniciada (próxima da fila) |
| In progress | Em desenvolvimento (limite: 1 item por vez) |
| In review | Implementada, em teste e revisão |
| Done | Concluída e testada |

## Priorização das funcionalidades
Os cards estão ordenados no Backlog, do mais prioritário para o menos.

1. **Busca por palavra-chave (#1)**: simples e de valor imediato, já que o
   sistema não tem forma de localizar perguntas.
2. **Votação em perguntas (#2)**: destaca as perguntas mais úteis.
3. **Categorização por tags (#3)**: melhora a organização e complementa a busca.
4. **Perfil de usuário (#4)**: depende de identificar usuários. Hoje o código
   grava um `id_usuario` fixo ao cadastrar perguntas.
5. **Notificação de novas respostas (#5)**: depende do perfil de usuário,
   pois é preciso saber quem deve ser notificado.