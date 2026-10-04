# Análise dos Princípios SOLID

Observação: o enunciado cita `routes/` e `models/`, mas neste repositório as
rotas estão em `server.js` e as regras de negócio em `modelo.js`. A análise usa
esses arquivos e também `bd/bd_utils.js`.

## Trechos que seguem os princípios

### 1. SRP: `bd/bd_utils.js` só cuida do acesso ao banco

```js
function query(query, params) {
  return bd.prepare(query).get(params);
}

function queryAll(query, params) {
  return bd.prepare(query).all(params);
}

function exec(statement, params) {
  return bd.prepare(statement).run(params);
}
```
O módulo tem uma única responsabilidade: abrir a conexão e executar comandos
SQL. Ele não conhece perguntas, respostas nem regras do fórum, e só mudaria se
a forma de acessar o banco mudasse (por exemplo, trocar a biblioteca SQLite).

### 2. SRP: a camada HTTP não contém SQL
```js
app.post('/respostas', (req, res) => {
  try {
    const id_pergunta = req.body.id_pergunta;
    const resposta = req.body.resposta;
    const id_resposta = modelo.cadastrar_resposta(id_pergunta, resposta);
    res.json({id_resposta: id_resposta});
  }
  catch(erro) {
    res.status(500).json(erro.message);
  }
});
```
A rota só lê a requisição, delega ao `modelo` e devolve a resposta HTTP. Não há
SQL no `server.js`, e o `modelo.js` não conhece `req` nem `res`. Mudar o
formato da API não obriga a mexer no acesso a dados, e o contrário também vale.

### 3. DIP (parcial): o banco pode ser substituído nos testes
```js
var bd = require('./bd/bd_utils.js');

// usada pelo teste de unidade
// para que o modelo passe a usar uma versão "mockada" de bd
function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```
O `modelo.js` usa o banco por meio de quatro operações (`query`, `queryAll`,
`exec`, e a troca por `reconfig_bd`), e os testes de unidade injetam um
substituto, sem precisar de um banco real. Isso aproxima o código da inversão
de dependência. É parcial, porque o módulo ainda faz o `require` direto da
implementação concreta (ver a violação 2).

## Trechos que violam os princípios

### 1. OCP: nova funcionalidade exige modificar código existente
```js
function listar_perguntas() {
  const perguntas = bd.queryAll('select * from perguntas', []);
  perguntas.forEach(pergunta => pergunta['num_respostas'] = get_num_respostas(pergunta['id_pergunta']));
  return perguntas;
}
```
```js
app.get('/', (req, res) => {
  try {
    const perguntas = modelo.listar_perguntas();
    res.send(perguntas);
  }
  ...
```
Para acrescentar a busca por palavra-chave, seria preciso editar
`listar_perguntas` (para aceitar um filtro e alterar o SQL) e também a rota
`GET /`. Cada novo critério (tags, votos) obrigaria a modificar de novo as
mesmas funções. O código não está aberto para extensão: o comportamento só
muda alterando o que já existe, com risco de quebrar o que funciona.

### 2. SRP e DIP: `modelo.js` mistura regras com SQL e depende da implementação concreta
```js
var bd = require('./bd/bd_utils.js');

function cadastrar_pergunta(texto) {
  const params = [texto, 1];
  const result = bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta', params);
  return result.lastInsertRowid;
}
```
O mesmo arquivo conhece o esquema das tabelas (escreve o SQL), define regras
(como o usuário fixo `1`) e monta resultados (como o `num_respostas`). Há mais
de um motivo para mudá-lo: uma alteração no esquema do banco ou numa regra do
fórum obriga a editar o mesmo módulo. Além disso, ele depende diretamente do
módulo concreto `bd_utils.js`, e a troca por um mock só é possível com a função
auxiliar `reconfig_bd`, um remendo pensado para os testes.

## Princípios sem trecho relevante
- **LSP:** não há herança nem hierarquia de tipos no código, então o princípio
  não se aplica.
- **ISP:** o `bd_utils.js` expõe só quatro funções pequenas, e o `modelo.js`
  usa todas elas, sem interfaces grandes.