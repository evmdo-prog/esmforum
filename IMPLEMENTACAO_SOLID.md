# Implementação com SOLID: Busca por palavra-chave

Funcionalidade implementada: busca de perguntas por palavra-chave, um dos
cinco cards do board da Parte 1 e a História 1 da Parte 2 (`HISTORIAS.md`).

Rota nova: `GET /busca?q=palavra`. Sem o parâmetro `q`, devolve todas as
perguntas. A busca ignora maiúsculas, minúsculas e acentos.

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `busca/repositorio_perguntas.js` | consulta SQL das perguntas com a contagem de respostas |
| `busca/servico_busca.js` | aplica os filtros às perguntas |
| `busca/filtros.js` | cria os filtros a partir dos parâmetros da URL |
| `server.js` | monta as peças e expõe a rota `/busca` |
| `testes/busca.test.js` | testes de unidade |

## SRP: uma responsabilidade por módulo
- O **repositório** é o único lugar da busca que conhece o SQL e o esquema
  das tabelas.
- O **serviço** só aplica filtros. Não tem SQL nem usa `req` ou `res`.
- Os **filtros** só decidem se uma pergunta atende a um critério.
- A **rota** só traduz a requisição HTTP e devolve o resultado.

Na análise (`ANALISE_SOLID.md`), o `modelo.js` misturava SQL, regras e
montagem de resultados. Na busca, cada uma dessas tarefas ficou em um módulo.

## DIP: dependência de abstrações, não de implementações
O serviço não faz `require` do banco. Ele recebe o repositório por parâmetro:

```js
function criar_servico_busca(repositorio) { ... }
```
E o repositório recebe o acesso ao banco da mesma forma:

```js
function criar_repositorio_perguntas(bd) { ... }
```
As peças são montadas em um único ponto, o `server.js`:

```js
const servico_busca = criar_servico_busca(criar_repositorio_perguntas(bd));
```
Com isso, o `testes/busca.test.js` testa o serviço com um repositório falso,
sem banco de dados e sem o `reconfig_bd` usado no `modelo.js`.

## OCP: aberto para extensão, fechado para modificação
Cada critério de busca é um filtro: uma função que recebe uma pergunta e
devolve `true` ou `false`. Os filtros são registrados em uma tabela:

```js
const fabricas_de_filtro = {
  q: filtro_palavra_chave,
};
```
Para acrescentar um critério novo, como o filtro por tag (História 3), basta
escrever o filtro e registrá-lo nessa tabela (por exemplo `tag: filtro_por_tag`).
O serviço, o repositório e a rota continuam como estão.

## Limitações
- O filtro roda em JavaScript depois de carregar todas as perguntas. Com muitos
  dados, seria melhor filtrar no banco.
- Um filtro que dependa de dados que o repositório ainda não devolve (como as
  tags) exigiria ampliar a consulta do repositório.
- O frontend (`esmforum-react`) ainda não usa a rota `/busca`.
- O `modelo.js` e a rota `GET /` foram mantidos sem alteração, para não
  quebrar os testes e o frontend existentes.

## Como testar
1. `npm test` executa os testes de unidade. Os 7 testes novos da busca passam
   junto com os 3 que já existiam.
2. Com o servidor em execução (`node server.js`), acessar
   `http://localhost:5000/busca?q=xp`. O resultado esperado é somente a
   pergunta "O que é XP?".
