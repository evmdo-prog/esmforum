# Design Simples (YAGNI)

Observação: o enunciado cita `routes/perguntas.js` e `routes/respostas.js`,
mas neste repositório as rotas estão em `server.js` e as regras de negócio em
`modelo.js`. A análise abaixo usa esses dois arquivos, além de
`bd/bd_utils.js`.

## O que já segue o design simples

### 1. Nenhuma abstração antecipada para o banco
O `modelo.js` escreve o SQL diretamente, sem ORM e sem camadas extras:

```js
function get_respostas(id_pergunta) {
  return bd.queryAll('select * from respostas where id_pergunta = ?', [id_pergunta]);
}
```
O sistema só tem duas tabelas e quatro operações, então um ORM seria
complexidade sem benefício hoje (YAGNI).

### 2. Usuário fixo em vez de um sistema de autenticação
Ao cadastrar uma pergunta, o código usa um usuário fixo:

```js
const params = [texto, 1];
```
Não existe login nem cadastro de usuários, porque nenhuma funcionalidade
atual precisa disso. A decisão foi adiada até existir a necessidade.

### 3. API mínima, apenas com o que a interface