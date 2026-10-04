// Único lugar da busca que conhece o SQL e o esquema das tabelas.
// Recebe o acesso ao banco como parâmetro, em vez de fazer require dele.

function criar_repositorio_perguntas(bd) {
  return {
    listar_com_num_respostas() {
      return bd.queryAll(
        `select p.id_pergunta, p.texto, p.id_usuario,
                count(r.id_resposta) as num_respostas
           from perguntas p
           left join respostas r on r.id_pergunta = p.id_pergunta
          group by p.id_pergunta, p.texto, p.id_usuario
          order by p.id_pergunta`,
        []
      );
    },
  };
}

module.exports = { criar_repositorio_perguntas };