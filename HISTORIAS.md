# Histórias de Usuário

## História 1: Busca de perguntas por palavra-chave

**Como** usuário do fórum,  
**Eu quero** pesquisar perguntas digitando uma palavra-chave,  
**Para** encontrar rapidamente perguntas já feitas, sem percorrer a lista inteira.

**Critérios de Aceitação:**
- [ ] A tela de perguntas exibe um campo de busca
- [ ] Ao buscar, a lista mostra apenas perguntas cujo texto contém a palavra digitada
- [ ] A busca não diferencia maiúsculas de minúsculas
- [ ] Se nenhuma pergunta for encontrada, o sistema exibe uma mensagem informando isso
- [ ] Ao limpar o campo, a lista completa volta a ser exibida

## História 2: Sistema de votação em perguntas

**Como** usuário do fórum,  
**Eu quero** votar positiva ou negativamente em perguntas (upvote/downvote),  
**Para** destacar as perguntas mais úteis e relevantes para a comunidade.

**Critérios de Aceitação:**
- [ ] Cada pergunta da lista exibe botões de upvote e downvote
- [ ] O contador de votos da pergunta é atualizado após o voto
- [ ] O usuário pode mudar seu voto (de upvote para downvote e vice-versa)
- [ ] Um mesmo usuário não pode votar mais de uma vez na mesma pergunta
- [ ] O total de votos é mantido ao recarregar a página

## História 3: Categorização de perguntas por tags

**Como** usuário do fórum,  
**Eu quero** associar tags (como tecnologia, carreira e dúvidas-gerais) às minhas perguntas,  
**Para** organizar o conteúdo e facilitar encontrar perguntas de um mesmo assunto.

**Critérios de Aceitação:**
- [ ] Ao cadastrar uma pergunta, o usuário pode escolher uma ou mais tags
- [ ] Cada pergunta da lista exibe as suas tags
- [ ] O usuário pode filtrar a lista de perguntas por uma tag
- [ ] Perguntas sem tag continuam sendo aceitas e exibidas normalmente

## Priorização

1. **Busca por palavra-chave (prioridade mais alta):** entrega valor
   imediato e é independente das demais. Hoje o fórum não tem como localizar
   uma pergunta, e a lista só cresce.
2. **Votação em perguntas:** destaca as perguntas mais úteis. Fica depois da
   busca porque o critério de voto único por usuário depende de identificar
   usuários, o que o sistema ainda não faz (hoje há um usuário fixo).
3. **Categorização por tags:** melhora a organização, mas exige mudar o banco
   (nova tabela de tags) e a tela de cadastro. É a mais trabalhosa das três
   e se beneficia de a busca já existir.