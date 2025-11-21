import express from "express"
import cors from "cors"
import fs from "fs" 
import path from "path" 
import { fileURLToPath } from 'url'

import verify_db from "./functions/database_verify.js"
import login_register_routes from "./controllers/login_register.js"
import admin from "./controllers/admin.js"
import user from "./controllers/user.js"
import empresa from "./controllers/empresa.js"
import lobbies from "./controllers/lobbies.js"
import vagas from "./controllers/vagas.js"
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import recomendacoes from "./controllers/recomendacoes.js";


dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

verify_db()

app.use(cors())
app.use(express.json())

app.use(login_register_routes)
app.use(admin)
app.use(user)
app.use(empresa)
app.use(lobbies)
app.use(vagas)
app.use(recomendacoes)

app.get('/healthcheck', (req, res) => {
  res.send("Ok!")
})

app.get('/api/buscar-usuario/:id', (req, res) => {
  const userId = req.params.id;
  
  const filePath = path.join(__dirname, 'data', 'user.json'); 

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo no caminho:", filePath);
      console.error("Detalhe do erro:", err);
      return res.status(500).json({ error: "Erro no servidor ao ler banco de usuários." });
    }

    try {
      const users = JSON.parse(data);
      const foundUser = users.find(u => String(u.id) === String(userId));

      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(404).json({ error: "Usuário não encontrado." });
      }
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: "Erro ao processar o JSON de usuários." });
    }
  });
});


const lobbiesPath = path.join(__dirname, 'data', 'lobbies.json');

app.get('/api/lobby/:lobbyId', (req, res) => {
  const { lobbyId } = req.params;

  fs.readFile(lobbiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler lobbies." });

    try {
      const lobbies = JSON.parse(data);
      const lobby = lobbies.find(l => l.id === lobbyId);
      
      if (lobby) {
        res.json(lobby.candidates || []);
      } else {
        res.json([]); 
      }
    } catch (e) {
      res.status(500).json({ error: "Erro no JSON de lobbies." });
    }
  });
});

app.post('/api/lobby/:lobbyId/adicionar', (req, res) => {
  const { lobbyId } = req.params;
  const novoCandidato = req.body;

  fs.readFile(lobbiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler arquivo." });

    let lobbies = JSON.parse(data);
    
    const lobbyIndex = lobbies.findIndex(l => l.id === lobbyId);

    if (lobbyIndex === -1) {
      return res.status(404).json({ error: "Lobby não encontrado." });
    }

    const existe = lobbies[lobbyIndex].candidates.find(c => c.id === novoCandidato.id);
    if (existe) {
      return res.status(400).json({ error: "Usuário já está no lobby." });
    }

    lobbies[lobbyIndex].candidates.push(novoCandidato);

    fs.writeFile(lobbiesPath, JSON.stringify(lobbies, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Erro ao salvar no disco." });
      
      res.json({ message: "Salvo com sucesso!", candidates: lobbies[lobbyIndex].candidates });
    });
  });
});

app.post('/api/lobby/:lobbyId/ia-match', async (req, res) => {
  const { lobbyId } = req.params;
  console.log("\n--- INICIANDO REQUISIÇÃO IA ---");

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("A chave GEMINI_API_KEY não foi encontrada. Verifique o arquivo .env");
    }
    console.log("1. API Key detectada.");

    const usersPath = path.join(__dirname, 'data', 'user.json');
    const lobbiesPath = path.join(__dirname, 'data', 'lobbies.json');

    if (!fs.existsSync(usersPath)) throw new Error(`Arquivo user.json não encontrado em: ${usersPath}`);
    if (!fs.existsSync(lobbiesPath)) throw new Error(`Arquivo lobbies.json não encontrado em: ${lobbiesPath}`);

    const usersData = fs.readFileSync(usersPath, 'utf8');
    const lobbiesData = fs.readFileSync(lobbiesPath, 'utf8');
    
    const users = JSON.parse(usersData);
    const lobbies = JSON.parse(lobbiesData);
    console.log(`2. Arquivos lidos. Total usuários no banco: ${users.length}`);

    const lobbyIndex = lobbies.findIndex(l => l.id === lobbyId);
    if (lobbyIndex === -1) return res.status(404).json({ error: "Lobby não encontrado" });
    
    const currentLobby = lobbies[lobbyIndex];
    console.log(`3. Lobby encontrado: ${currentLobby.vaga}`);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite-preview-09-2025"});
    const listaCandidatos = users.map(u => ({
      id: u.id,
      name: u.name,
      habilidades: u.habilidades
    }));

    const prompt = `
      Atue como um Recrutador Sênior de TI.
      VAGA: ${currentLobby.vaga}
      
      LISTA DE CANDIDATOS:
      ${JSON.stringify(listaCandidatos)}

      TAREFA:
      Analise as habilidades de cada candidato em relação à vaga.
      Selecione apenas os candidatos com compatibilidade maior que 60%.
      
      FORMATO DE RESPOSTA OBRIGATÓRIO:
      Retorne APENAS um JSON válido (sem markdown, sem crases) que seja uma lista de objetos.
      Cada objeto deve ter exatamente: "id" (o mesmo da lista original) e "compatibilidade" (número inteiro de 0 a 100).
    `;

    console.log("4. Enviando prompt para o Google Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    console.log("5. Resposta Bruta da IA:", text); 

    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let sugestoesIA;
    try {
      sugestoesIA = JSON.parse(text);
    } catch (jsonError) {
      console.error("Erro ao converter resposta da IA para JSON:", text);
      throw new Error("A IA não retornou um JSON válido.");
    }

    let adicionados = 0;
    sugestoesIA.forEach(sugestao => {
      const usuarioOriginal = users.find(u => String(u.id) === String(sugestao.id));
      const jaNoLobby = currentLobby.candidates.some(c => String(c.id) === String(sugestao.id));

      if (usuarioOriginal && !jaNoLobby) {
        currentLobby.candidates.push({
          ...usuarioOriginal,
          compatibilidade: sugestao.compatibilidade,
          origem: "Sugestão IA"
        });
        adicionados++;
      }
    });

    if (adicionados > 0) {
      lobbies[lobbyIndex] = currentLobby;
      fs.writeFileSync(lobbiesPath, JSON.stringify(lobbies, null, 2));
    }

    console.log(`6. Sucesso! ${adicionados} candidatos adicionados.`);
    
    res.json({ 
      message: `${adicionados} candidatos sugeridos pela IA foram adicionados!`,
      candidates: currentLobby.candidates 
    });

  } catch (error) {
    console.error("\n=== ERRO FATAL ===");
    console.error(error);
    res.status(500).json({ error: error.message || "Erro interno no servidor." });
  }
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`)
})