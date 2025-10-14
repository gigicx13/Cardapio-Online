const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

// Função para ler arquivos JSON
function lerJSON(caminho) {
  return new Promise((resolve, reject) => {
    fs.readFile(caminho, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

// Função para escrever arquivos JSON
function escreverJSON(caminho, dados) {
  return new Promise((resolve, reject) => {
    fs.writeFile(caminho, JSON.stringify(dados, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Servidor
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // GET /cardapio
    if (req.method === "GET" && parsedUrl.pathname === "/cardapio") {
      const cardapio = await lerJSON("cardapio.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(cardapio));
      return;
    }

    // POST /pedidos
    if (req.method === "POST" && parsedUrl.pathname === "/pedidos") {
      let body = "";
      req.on("data", chunk => body += chunk);
      req.on("end", async () => {
        try {
          const pedido = JSON.parse(body);

          // Validação básica
          if (!pedido.cliente || !pedido.itens || pedido.itens.length === 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Pedido inválido" }));
            return;
          }

          // Ler pedidos existentes e adicionar novo
          const pedidosExistentes = await lerJSON("pedidos.json");
          const novoPedido = { ...pedido, id: Date.now() };
          pedidosExistentes.push(novoPedido);
          await escreverJSON("pedidos.json", pedidosExistentes);

          // Retornar mensagem de sucesso em JSON
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Pedido enviado com sucesso!" }));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Erro ao salvar pedido" }));
        }
      });
      return;
    }

    // Rota não encontrada
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Rota não encontrada" }));

  } catch (err) {
    // Captura erros inesperados
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Erro interno do servidor" }));
  }
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
