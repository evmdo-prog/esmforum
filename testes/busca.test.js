const { criar_servico_busca } = require('../busca/servico_busca.js');
const { filtro_palavra_chave, montar_filtros } = require('../busca/filtros.js');

const perguntas = [
  { id_pergunta: 1, texto: 'O que é XP?', id_usuario: 1, num_respostas: 1 },
  { id_pergunta: 2, texto: 'Como funciona o Scrum?', id_usuario: 1, num_respostas: 0 },
  { id_pergunta: 3, texto: 'Qual a diferença entre xp e scrum?', id_usuario: 1, num_respostas: 2 },
];

// repositório falso: o serviço é testado sem banco de dados
const repositorio_falso = { listar_com_num_respostas: () => perguntas };
const servico = criar_servico_busca(repositorio_falso);

function ids(resultado) {
  return resultado.map((p) => p.id_pergunta);
}

test('sem filtros devolve todas as perguntas', () => {
  expect(ids(servico.buscar())).toEqual([1, 2, 3]);
});

test('busca pela palavra-chave', () => {
  expect(ids(servico.buscar([filtro_palavra_chave('scrum')]))).toEqual([2, 3]);
});

test('busca não diferencia maiúsculas de minúsculas', () => {
  expect(ids(servico.buscar([filtro_palavra_chave('XP')]))).toEqual([1, 3]);
});

test('busca ignora acentos', () => {
  expect(ids(servico.buscar([filtro_palavra_chave('diferenca')]))).toEqual([3]);
});

test('palavra inexistente devolve lista vazia', () => {
  expect(servico.buscar([filtro_palavra_chave('kanban')])).toEqual([]);
});

test('montar_filtros ignora parâmetro vazio', () => {
  expect(montar_filtros({ q: '   ' })).toHaveLength(0);
  expect(montar_filtros({})).toHaveLength(0);
});

test('montar_filtros cria o filtro de palavra-chave', () => {
  expect(montar_filtros({ q: 'xp' })).toHaveLength(1);
});