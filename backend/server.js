import express from "express"
import cors from "cors"
import fs from "fs" // <--- ADICIONADO
import path from "path" // <--- ADICIONADO
import { fileURLToPath } from 'url' // <--- NECESSÁRIO PARA CRIAR O __dirname

import verify_db from "./functions/database_verify.js"
import login_register_routes from "./controllers/login_register.js"
import admin from "./controllers/admin.js"
import user from "./controllers/user.js"
import empresa from "./controllers/empresa.js"
import lobbies from "./controllers/lobbies.js"
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis do .env

// --- CONFIGURAÇÃO DO __dirname PARA ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// -------------------------------------------------

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

app.get('/healthcheck', (req, res) => {
  res.send("Ok!")
})

// Rota para buscar um usuário específico dentro do users.json
app.get('/api/buscar-usuario/:id', (req, res) => {
  const userId = req.params.id;
  
  // IMPORTANTE: Certifique-se de que o arquivo user.json está na MESMA pasta que o server.js
  // Se estiver em uma pasta 'database', mude para: path.join(__dirname, 'database', 'user.json');
  const filePath = path.join(__dirname, 'data', 'user.json'); 

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo no caminho:", filePath);
      console.error("Detalhe do erro:", err);
      // Retornamos erro 500 para o frontend saber que falhou
      return res.status(500).json({ error: "Erro no servidor ao ler banco de usuários." });
    }

    try {
      const users = JSON.parse(data);
      // O ID no JSON pode ser número ou string, forçamos comparação de string para garantir
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

// --- ROTAS PARA GERENCIAR O LOBBY ---

const lobbiesPath = path.join(__dirname, 'data', 'lobbies.json');

// 1. ROTA PARA PEGAR OS CANDIDATOS ATUAIS DO LOBBY
app.get('/api/lobby/:lobbyId', (req, res) => {
  const { lobbyId } = req.params;

  fs.readFile(lobbiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler lobbies." });

    try {
      const lobbies = JSON.parse(data);
      const lobby = lobbies.find(l => l.id === lobbyId);
      
      if (lobby) {
        res.json(lobby.candidates || []); // Retorna só a lista de candidatos
      } else {
        res.json([]); // Se não achar o lobby, retorna lista vazia
      }
    } catch (e) {
      res.status(500).json({ error: "Erro no JSON de lobbies." });
    }
  });
});

// 2. ROTA PARA SALVAR UM CANDIDATO NO LOBBY
app.post('/api/lobby/:lobbyId/adicionar', (req, res) => {
  const { lobbyId } = req.params;
  const novoCandidato = req.body; // O frontend vai mandar o objeto do usuário

  fs.readFile(lobbiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler arquivo." });

    let lobbies = JSON.parse(data);
    
    // Encontra o índice do lobby correto
    const lobbyIndex = lobbies.findIndex(l => l.id === lobbyId);

    if (lobbyIndex === -1) {
      return res.status(404).json({ error: "Lobby não encontrado." });
    }

    // Verifica se já existe para não duplicar no JSON
    const existe = lobbies[lobbyIndex].candidates.find(c => c.id === novoCandidato.id);
    if (existe) {
      return res.status(400).json({ error: "Usuário já está no lobby." });
    }

    // Adiciona o candidato na lista desse lobby
    lobbies[lobbyIndex].candidates.push(novoCandidato);

    // Escreve a nova lista inteira de volta no arquivo
    fs.writeFile(lobbiesPath, JSON.stringify(lobbies, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Erro ao salvar no disco." });
      
      res.json({ message: "Salvo com sucesso!", candidates: lobbies[lobbyIndex].candidates });
    });
  });
});

// --- ROTA DE INTEGRAÇÃO COM IA GEMINI (MODO DEBUG) ---
app.post('/api/lobby/:lobbyId/ia-match', async (req, res) => {
  const { lobbyId } = req.params;
  console.log("\n--- INICIANDO REQUISIÇÃO IA ---");

  try {
    // DEBUG 1: Verificar Chave de API
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("A chave GEMINI_API_KEY não foi encontrada. Verifique o arquivo .env");
    }
    console.log("1. API Key detectada.");

    // DEBUG 2: Verificar Arquivos
    const usersPath = path.join(__dirname, 'data', 'user.json');
    const lobbiesPath = path.join(__dirname, 'data', 'lobbies.json');

    if (!fs.existsSync(usersPath)) throw new Error(`Arquivo user.json não encontrado em: ${usersPath}`);
    if (!fs.existsSync(lobbiesPath)) throw new Error(`Arquivo lobbies.json não encontrado em: ${lobbiesPath}`);

    const usersData = fs.readFileSync(usersPath, 'utf8');
    const lobbiesData = fs.readFileSync(lobbiesPath, 'utf8');
    
    const users = JSON.parse(usersData);
    const lobbies = JSON.parse(lobbiesData);
    console.log(`2. Arquivos lidos. Total usuários no banco: ${users.length}`);

    // DEBUG 3: Verificar Lobby
    const lobbyIndex = lobbies.findIndex(l => l.id === lobbyId);
    if (lobbyIndex === -1) return res.status(404).json({ error: "Lobby não encontrado" });
    
    const currentLobby = lobbies[lobbyIndex];
    console.log(`3. Lobby encontrado: ${currentLobby.vaga}`);

    // DEBUG 4: Preparar Prompt
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Usando o modelo exato que sua conta tem acesso
    // Tentativa com o modelo mais econômico e estável
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
    
    console.log("5. Resposta Bruta da IA:", text); // <--- ISSO É O MAIS IMPORTANTE

    // Limpeza agressiva do JSON (A IA às vezes coloca ```json ... ```)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let sugestoesIA;
    try {
      sugestoesIA = JSON.parse(text);
    } catch (jsonError) {
      console.error("Erro ao converter resposta da IA para JSON:", text);
      throw new Error("A IA não retornou um JSON válido.");
    }

    // Processamento (igual ao anterior)
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