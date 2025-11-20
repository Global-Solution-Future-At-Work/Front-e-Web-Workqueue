import express from "express";
import fs from "fs";

const router = express.Router();

function loadDB() {
  return JSON.parse(fs.readFileSync("./database.json"));
}

function saveDB(db) {
  fs.writeFileSync("./database.json", JSON.stringify(db, null, 2));
}

// GET lobby
router.get("/:id", (req, res) => {
  const db = loadDB();
  const lobby = db.lobbies.find(l => l.id === req.params.id);

  if (!lobby) return res.status(404).json({ error: "Lobby não encontrado." });

  res.json(lobby);
});

// POST adicionar usuário
router.post("/:id/add", (req, res) => {
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
