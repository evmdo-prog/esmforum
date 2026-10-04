# Caso de Uso: Votar em Pergunta

**Atores:** Usuário do fórum

**Pré-condições:**
- O usuário está identificado no sistema (na versão atual, o sistema usa
  um usuário fixo)
- A pergunta existe no banco de dados
- O frontend e o backend estão em execução

**Fluxo Principal:**
1. O sistema exibe a lista de perguntas com o total de votos de cada uma
2. O usuário clica no botão de upvote (ou downvote) de uma pergunta
3. O sistema verifica se o usuário já votou nessa pergunta
4. O sistema registra o voto no banco de dados
5. O sistema recalcula o total de votos da pergunta
6. O sistema exibe o total atualizado na lista

**Fluxos Alternativos:**

*Alternativo 1: usuário muda o voto (já votou o contrário)*
- 3a. O sistema detecta que o usuário já votou nessa pergunta com o tipo oposto
- 3b. O sistema substitui o voto anterior pelo novo
- 3c. Retorna ao passo 5 do fluxo principal

*Alternativo 2: usuário repete o mesmo voto*
- 3a. O sistema detecta que o usuário já votou igual nessa pergunta
- 3b. O sistema não registra um novo voto e mantém o total
- 3c. O sistema informa que o voto já foi computado
- 3d. O caso de uso termina

*Alternativo 3: pergunta inexistente*
- 3a. O sistema não encontra a pergunta (por exemplo, ela foi removida)
- 3b. O sistema exibe uma mensagem de erro
- 3c. O caso de uso termina

**Pós-condições:**
- O voto do usuário está registrado, e há no máximo um voto dele por pergunta
- O total de votos da pergunta reflete todos os votos registrados
- O total é mantido ao recarregar a página