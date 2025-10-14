# 🏪 Problema 1 - Cardápio da Lanchonete

Este projeto teve consiste em uma aplicação simples para uma lanchonete de bairro, onde os clientes podem visualizar o cardápio, adicionar itens ao carrinho e enviar pedidos. Foi desenvolvido para um teste tecnico para uma vaga de estágio em desevolvimento de software.

---

## Estrutura do Projeto

frontend/
- index.html        → Página do cardápio
- carrinho.html     → Página do carrinho
- style.css         → Estilos CSS para ambas as páginas
- app.js            → JavaScript do cardápio

backend/
- index.js          → Servidor Node.js
- cardapio.json     → Banco de dados do cardápio
- pedidos.json      → Banco de dados dos pedidos

README.md

---

## Pré-requisitos

- Node.js instalado (versão 12 ou superior)
- Navegador moderno (Chrome, Edge, Firefox)

---

## Execução do Projeto

### Backend

1. Abra o terminal e navegue até a pasta `backend`.
2. Execute o servidor com o comando:
   `node index.js`
3. Se estiver funcionando corretamente, verá:
   `Servidor rodando em http://localhost:3000`

### Frontend

1. Abra a pasta `frontend`.
2. Abra o arquivo `index.html` no navegador.
3. O cardápio será carregado automaticamente.
4. Funcionalidades disponíveis:
   - Filtrar produtos por categoria
   - Buscar produtos pelo nome
   - Adicionar produtos ao carrinho

### Carrinho de Compras

1. Abra `carrinho.html`.
2. O carrinho exibe:
   - Subtotal
   - Desconto (10%)
   - Frete (R$ 5,00)
   - Total
3. Preencha seu nome e observações e clique em **Enviar Pedido**.
4. Uma mensagem de sucesso será exibida e o pedido será salvo em `pedidos.json`.

---

## Observações

- O backend lê e escreve diretamente nos arquivos JSON (`cardapio.json` e `pedidos.json`).
- Para alterar os produtos, edite `cardapio.json`.
- Frontend e backend devem estar na mesma máquina.

---

## Testes

1. Abra `index.html` e verifique se o cardápio aparece.
2. Adicione produtos e abra `carrinho.html`.
3. Envie um pedido e confirme que `pedidos.json` foi atualizado.

---

## Capturas de Tela

Inclua aqui prints do funcionamento do sistema:

**Cardápio:**  
![Cardápio](imgs/pagina-inicial.png)

**Carrinho:**  
![Carrinho](imgs/carrinho.png)
