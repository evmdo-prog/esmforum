// Regra da busca: pega as perguntas e mantém só as que passam por todos os
// filtros. Não conhece SQL, HTTP nem o tipo de filtro usado.

function criar_servico_busca(repositorio) {
  return {
    buscar(filtros = []) {
      const perguntas = repositorio.listar_com_num_respostas();
      return perguntas.filter((pergunta) => filtros.every((filtro) => filtro(pergunta)));
    },
  };
}

module.exports = { criar_servico_busca };