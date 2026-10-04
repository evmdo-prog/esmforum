# Planejamento de Pair Programming

Este projeto está sendo desenvolvido individualmente. Este documento descreve
como a prática seria aplicada se houvesse um par.

## Estratégia
O pair programming seria usado nas partes em que duas cabeças ajudam mais:
- modelagem do banco e escrita das consultas SQL (votos, tags, busca);
- implementação da funcionalidade da Parte 3, aplicando os princípios SOLID;
- escrita dos testes de unidade do `modelo.js`.

Tarefas simples, como ajustes de texto e documentação, seriam feitas
separadamente.

## Papéis
- **Driver:** escreve o código.
- **Navigator:** revisa o que está sendo escrito, pensa na estrutura e nos
  casos de borda, e consulta a documentação.

## Rotação
Os papéis trocariam a cada 25 minutos (técnica Pomodoro) e sempre que uma
tarefa terminasse, para que os dois participem do código e do raciocínio.

## Ferramentas
- **VS Code Live Share**, para editar o mesmo código em tempo real.
- **Discord** ou **Google Meet**, para conversar e compartilhar a tela.
- **GitHub**, com commits pequenos e frequentes, indicando os dois autores.

## Como compensar o trabalho individual
Sem um par, o equivalente seria explicar o código em voz alta (rubber
duck debugging), revisar o próprio código no dia seguinte e abrir pull
requests para si mesma antes de integrar na branch principal.