import express from "express";
import fs from "fs";

const router = express.Router();

function loadDB() {
  try {
    return JSON.parse(fs.readFileSync("./database.json"));
  } catch (e) {
    return { lobbies: [], usuarios: [] };
  }
}

function saveDB(db) {
  fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
}

// Rotas Atualizadas com o prefixo /lobbies

// GET /lobbies - Lista todos os lobbies
router.get("/lobbies", (req, res) => {
  const db = loadDB();
  res.json(db.lobbies || []);
});

// POST /lobbies - Cria um novo lobby
router.post("/lobbies", (req, res) => {
  const db = loadDB();
  
  const newLobby = {
    id: `lobby_${Date.now()}`,
    nome: req.body.nome,
    descricao: req.body.descricao,
    localizacao: req.body.localizacao,
    requisitos: req.body.requisitos,
    candidatos: [], 
    createdAt: new Date().toISOString()
  };

  if (!db.lobbies) db.lobbies = [];
  db.lobbies.push(newLobby);
  
  saveDB(db);
  res.status(201).json(newLobby);
});

// Detalhes de um lobby específico
router.get("/lobbies/:id", (req, res) => {
  const db = loadDB();
  const lobby = db.lobbies.find(l => l.id === req.params.id);

  if (!lobby) return res.status(404).json({ error: "Lobby não encontrado." });

  res.json(lobby);
});

// POST - Adicionar usuário ao lobby
router.post("/lobbies/:id/add", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const db = loadDB();

  const lobby = db.lobbies.find(l => l.id === id);
  if (!lobby) return res.status(404).json({ error: "Lobby não encontrado." });

  const user = db.usuarios.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

  if (!lobby.candidatos.includes(userId)) {
    lobby.candidatos.push(userId);
  }

  saveDB(db);

  res.json({ message: "Usuário adicionado!", lobby });
});

export default router;