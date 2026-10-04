# Padrões de Projeto Existentes

Observação: o enunciado cita `routes/` e `models/`, mas neste repositório as
rotas estão em `server.js` e as regras de negócio em `modelo.js`. A análise usa
esses arquivos, `bd/bd_utils.js` e a pasta `busca/`, criada na Iteração 1.

## Resumo

| Padrão | Onde | Implementação |
|---|---|---|
| Singleton | `bd/bd_utils.js` | parcial |
| Adapter | `bd/bd_utils.js` | parcial |
| Injeção de dependência | `modelo.js` (`reconfig_bd`) | parcial |
| Chain of Responsibility (middleware) | `server.js` | completa, fornecida pelo Express |
| MVC | `server.js`, `modelo.js` e frontend React | parcial |
| Strategy | `busca/filtros.js` e `busca/servico_busca.js` | completa para o escopo atual |
| Factory | `montar_filtros` em `busca/filtros.js` | simples |
| Repository | `busca/repositorio_perguntas.js` | completa para o escopo atual |

## 1. Singleton (parcial): `bd/bd_utils.js`

```js
const Database = require('better-sqlite3');
var bd = new Database('./bd/esmforum.db');
```
O módulo cria a conexão com o banco uma única vez, e o sistema de módulos do
Node.js devolve a mesma instância a todos que fazem `require('./bd/bd_utils.js')`
(o `modelo.js` e o `server.js` compartilham a mesma conexão).

**Pode ser melhorado:** não há uma proteção explícita da instância única, e a
função `reconfig(nome)` substitui a conexão em qualquer momento. Seria mais
claro expor a instância por uma função de acesso e restringir a troca ao
ambiente de testes.

## 2. Adapter (parcial): `bd/bd_utils.js`

```js
function query(query, params) { return bd.prepare(query).get(params); }
function queryAll(query, params) { return bd.prepare(query).all(params); }
function exec(statement, params) { return bd.prepare(statement).run(params); }
```
O módulo adapta a interface da biblioteca `better-sqlite3` (`prepare().get`,
`.all` e `.run`) para três funções simples, que o resto do sistema usa.

**Pode ser melhorado:** o contrato não está declarado, e as funções devolvem
objetos da biblioteca (por exemplo, `lastInsertRowid`). Trocar de banco ainda
exigiria mudar quem usa esses resultados. A proposta completa está em
`PADROES_PROPOSTOS.md`.

## 3. Injeção de dependência (parcial): `modelo.js`

```js
var bd = require('./bd/bd_utils.js');

function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```
A função permite que os testes de unidade troquem o banco por um objeto falso.
É injeção por setter, uma técnica ligada ao princípio DIP.

**Pode ser melhorado:** o módulo ainda faz o `require` direto da implementação
concreta, e a troca depende de uma função criada só para os testes. Receber a
dependência por parâmetro, como foi feito na busca, é mais limpo.

## 4. Chain of Responsibility (middleware do Express): `server.js`

```js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  ...
  next();
});
```
O Express processa cada requisição por uma cadeia de funções (`express.json()`,
o middleware de CORS e depois a rota). Cada elo trata a requisição e chama
`next()` para passar ao seguinte.

**Implementação completa**, fornecida pelo framework. Uma melhoria possível é
acrescentar um middleware de tratamento de erros, que removeria os blocos
`try/catch` repetidos em todas as rotas.

## 5. MVC (parcial)

| Papel | Onde |
|---|---|
| Model | `modelo.js` e o banco |
| Controller | as rotas de `server.js` |
| View | o frontend React (`esmforum-react`), que consome JSON |

**Pode ser melhorado:** o controlador e a configuração do servidor estão no
mesmo arquivo, e o `modelo.js` mistura regras com SQL. A separação em camadas
está proposta em `PROPOSTA_ARQUITETURA.md`.

## 6. Strategy: `busca/filtros.js` e `busca/servico_busca.js`

Cada critério de busca é uma função com a mesma assinatura (recebe uma pergunta
e devolve `true` ou `false`), e o serviço aplica quaisquer filtros recebidos
sem conhecer o critério:

```js
return perguntas.filter((pergunta) => filtros.every((filtro) => filtro(pergunta)));
```
**Implementação completa para o escopo atual**, mas tem só um critério
(palavra-chave). A flexibilidade aparece quando os filtros por tag ou por votos
forem acrescentados.

## 7. Factory: `montar_filtros` em `busca/filtros.js`

```js
const fabricas_de_filtro = { q: filtro_palavra_chave };

function montar_filtros(query) { ... }
```
A função cria os filtros a partir dos parâmetros da URL, escolhendo a fábrica
certa em uma tabela. Quem chama não precisa saber qual filtro existe.

**Implementação simples**, uma fábrica baseada em dicionário. Não há classes
nem hierarquia, o que é suficiente para o tamanho atual do sistema.

## 8. Repository: `busca/repositorio_perguntas.js`

O módulo concentra o SQL das perguntas e esconde o esquema das tabelas do
resto do sistema, recebendo o acesso ao banco por parâmetro.

**Implementação completa para o escopo atual**, mas cobre apenas a listagem
usada pela busca. As demais consultas continuam no `modelo.js`.
