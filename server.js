const express = require('express')
const modelo = require('./modelo.js');
const bd = require('./bd/bd_utils.js');
const { criar_repositorio_perguntas } = require('./busca/repositorio_perguntas.js');
const { criar_servico_busca } = require('./busca/servico_busca.js');
const { montar_filtros } = require('./busca/filtros.js');

const servico_busca = criar_servico_busca(criar_repositorio_perguntas(bd));

const app = express()
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  try {
    const perguntas = modelo.listar_perguntas();
    res.send(perguntas);
  }
  catch(erro) {
    res.status(500).json(erro.message); 
  }
});

app.post('/perguntas', (req, res) => {
  try {
    const id_pergunta = modelo.cadastrar_pergunta(req.body.pergunta);
    res.json({id_pergunta: id_pergunta});
  }
  catch(erro) {
    res.status(500).json(erro.message); 
  } 
});

app.get('/respostas/:id_pergunta', (req, res) => {
  const id_pergunta = req.params.id_pergunta;
  const pergunta = modelo.get_pergunta(id_pergunta);
  const respostas = modelo.get_respostas(id_pergunta);
  try {
    res.json({
      pergunta: pergunta,
      respostas: respostas
    });
  }
  catch(erro) {
    res.status(500).json(erro.message); 
  } 
});

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

app.get('/busca', (req, res) => {
  try {
    const filtros = montar_filtros(req.query);
    res.json(servico_busca.buscar(filtros));
  }
  catch(erro) {
    res.status(500).json(erro.message);
  }
});

// espera e trata requisições de clientes
const port = 5000;
app.listen(port, 'localhost', () => {
  console.log(`ESM Forum rodando em ${port}`)
});