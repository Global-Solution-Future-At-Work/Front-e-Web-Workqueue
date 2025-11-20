// Criar Endpoints de vagas para empresas (adicionar id) no json de vagas, fazer CRUD de vagas, tirar atualizar critérios de IA
// Adicionar pessoas manualmente -> Pega o uuId da pessoa (user)
// Criar um endpoint para adicionar pessoas manualmente e um endpoint para implementar o Gemini depois para seleção de vagas automáticas

// Listar Vagas
app.get("/vagas", (req, res) => {
  res.json(db.vagas);
});

// Criar Vagas
app.post("/vagas", (req, res) => {
  const novaVaga = {
    id: "vaga_" + Date.now(),
    empresaId: req.body.empresaId,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    local: req.body.local,
    tecnologias: req.body.tecnologias || [],
    status: "aberta",
    candidatos: []
  };

  db.vagas.push(novaVaga);
  res.status(201).json(novaVaga);
});

// Atualizar Vagas
app.put("/vagas/:id", (req, res) => {
  const id = req.params.id;
  const index = db.vagas.findIndex(v => v.id === id);

  if (index === -1) return res.status(404).send("Vaga não encontrada");

  db.vagas[index] = { ...db.vagas[index], ...req.body };

  res.json(db.vagas[index]);
});

// Deletar Vagas
app.delete("/vagas/:id", (req, res) => {
  const id = req.params.id;
  db.vagas = db.vagas.filter(v => v.id !== id);
  res.sendStatus(204);
});
