// Cada filtro é uma função que recebe uma pergunta e devolve true ou false.
// Para criar um novo critério de busca (tags, votos...), basta escrever um
// novo filtro e registrá-lo em `fabricas_de_filtro`.

function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function filtro_palavra_chave(palavra) {
  const alvo = normalizar(palavra.trim());
  return (pergunta) => normalizar(pergunta.texto).includes(alvo);
}

// parâmetro da URL -> função que cria o filtro
const fabricas_de_filtro = {
  q: filtro_palavra_chave,
};

function montar_filtros(query) {
  return Object.entries(fabricas_de_filtro)
    .filter(([parametro]) => query[parametro] && String(query[parametro]).trim() !== '')
    .map(([parametro, fabrica]) => fabrica(String(query[parametro])));
}

module.exports = { filtro_palavra_chave, montar_filtros };