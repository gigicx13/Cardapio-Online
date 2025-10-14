// FUNÇÃO PARA RENDERIZAR O CARRINHO
function renderCarrinho() {
  const carrinhoContainer = document.getElementById("carrinho-container");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinhoContainer.innerHTML = "";

  let subtotal = 0;

  carrinho.forEach(item => {
    subtotal += item.preco * item.quantidade;

    const div = document.createElement("div");
    div.classList.add("carrinho-item");
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" width="80">
      <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
      <p>Quantidade: ${item.quantidade}</p>
      <button onclick="adicionarItem(${item.id})">+</button>
    `;
    carrinhoContainer.appendChild(div);
  });

  // Calcular desconto e total
  const desconto = subtotal * 0.10;
  const frete = 5.0;
  const total = subtotal - desconto + frete;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("desconto").textContent = desconto.toFixed(2);
  document.getElementById("frete").textContent = frete.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

// FUNÇÃO PARA ADICIONAR MAIS UM ITEM
function adicionarItem(id) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.quantidade++;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
  }
}

// FUNÇÃO PARA ENVIAR PEDIDO
document.getElementById("form-pedido").addEventListener("submit", async function(e) {
  e.preventDefault();
  const nomeCliente = document.getElementById("nomeCliente").value;
  const observacoes = document.getElementById("observacoes").value;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (!nomeCliente || carrinho.length === 0) {
    const msg = document.getElementById("mensagem");
    msg.textContent = "Preencha seu nome e adicione itens ao carrinho.";
    msg.style.color = "red";
    return;
  }

  const pedido = { cliente: nomeCliente, observacoes, itens: carrinho };

  try {
    const response = await fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    const data = await response.json();
    const msg = document.getElementById("mensagem");

    if (response.ok) {
      msg.textContent = data.message; // Mensagem de sucesso do backend
      msg.style.color = "green";
      localStorage.removeItem("carrinho"); // Limpar carrinho
      renderCarrinho(); // Atualizar a tela
      document.getElementById("form-pedido").reset(); // Limpar formulário
    } else {
      msg.textContent = data.error || "Erro ao enviar pedido.";
      msg.style.color = "red";
    }
  } catch (err) {
    const msg = document.getElementById("mensagem");
    msg.textContent = "Erro na comunicação com o servidor.";
    msg.style.color = "red";
  }
});

// Renderiza o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", renderCarrinho);
