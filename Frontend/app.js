let cardapio = [];

// BUSCAR CARDÁPIO DO BACKEND
async function carregarCardapio() {
  try {
    const response = await fetch("http://localhost:3000/cardapio");
    cardapio = await response.json();
    renderCardapio();
  } catch (error) {
    alert("Erro ao carregar cardápio");
    console.error(error);
  }
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = cardapio.find(i => i.id === id);
  const existente = carrinho.find(i => i.id === id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...item, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  // Mensagem estilizada em vez de alert
  const mensagem = document.createElement("div");
  mensagem.textContent = `${item.nome} adicionado ao carrinho!`;
  mensagem.style.position = "fixed";
  mensagem.style.top = "20px";
  mensagem.style.right = "20px";
  mensagem.style.backgroundColor = "#28a745";
  mensagem.style.color = "#fff";
  mensagem.style.padding = "10px 15px";
  mensagem.style.borderRadius = "5px";
  document.body.appendChild(mensagem);
  setTimeout(() => mensagem.remove(), 2000);
}

// RENDERIZAR CARDÁPIO
function renderCardapio(filtroCategoria = "todos", busca = "") {
  const container = document.getElementById("cardapio");
  container.innerHTML = "";

  const produtosFiltrados = cardapio.filter(item => {
    const matchCategoria = filtroCategoria === "todos" || item.categoria === filtroCategoria;
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  produtosFiltrados.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <h3>${item.nome}</h3>
      <p>${item.descricao}</p>
      <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
      <button onclick="adicionarCarrinho(${item.id})">Adicionar</button>
    `;
    container.appendChild(div);
  });
}

// FILTRO E BUSCA
document.addEventListener("DOMContentLoaded", () => {
  carregarCardapio();

  const buscaInput = document.getElementById("busca");
  const filtroSelect = document.getElementById("categoriaFiltro");

  buscaInput.addEventListener("input", () => {
    renderCardapio(filtroSelect.value, buscaInput.value);
  });

  filtroSelect.addEventListener("change", () => {
    renderCardapio(filtroSelect.value, buscaInput.value);
  });
});
