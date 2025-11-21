import React, { useState, useEffect } from 'react';
import ChatFlutuante from '../components/ChatFlutuante';

const lobbyData = {
  id: "lobby_1", 
  vaga: "Desenvolvedores Python e Designers UX/UI",
  sugestao: "IA Gemini: Sugestão automática de candidatos",
  compatibilidadeMedia: 86,
  status: "Ativo",
  criadoEm: "10/11/2025",
};

export default function Lobby() {
  const [lobby, setLobby] = useState(lobbyData);
  const [userId, setUserId] = useState("");
  const [candidates, setCandidates] = useState([]);
  
  // Loading da IA
  const [loadingIA, setLoadingIA] = useState(false);

  useEffect(() => {
    fetchLobbyCandidates();
  }, []);

  const fetchLobbyCandidates = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/lobby/${lobby.id}`);
      if (res.ok) {
        const data = await res.json();
        setCandidates(data);
      }
    } catch (error) {
      console.error("Erro ao carregar lobby:", error);
    }
  };

  // Integração com IA Gemini ---
  const handleAIMatch = async () => {
    setLoadingIA(true);
    try {
      const res = await fetch(`http://localhost:3000/api/lobby/${lobby.id}/ia-match`, {
        method: "POST"
      });
      
      const data = await res.json();

      if (res.ok) {
        setCandidates(data.candidates); // Atualiza a lista com os novos candidatos da IA
        alert(data.message);
      } else {
        alert("Erro na IA: " + (data.error || "Erro desconhecido"));
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao tentar usar a IA.");
    } finally {
      setLoadingIA(false); 
    }
  };

  // Função Manual
  const handleInvite = async () => {
    if (!userId) {
      alert("Digite o ID do usuário para convidar!");
      return;
    }

    if (candidates.some(c => c.id === userId)) {
      alert("Este usuário já está na lista de candidatos.");
      return;
    }

    try {
      // Busca dados do usuário
      const resUser = await fetch(`http://localhost:3000/api/buscar-usuario/${userId}`);
      const userData = await resUser.json();

      if (!resUser.ok) {
        alert(userData.error || "Erro ao buscar usuário.");
        return;
      }

      // Salva no lobby
      const resSave = await fetch(`http://localhost:3000/api/lobby/${lobby.id}/adicionar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const saveResponse = await resSave.json();

      if (resSave.ok) {
        setCandidates(saveResponse.candidates);
        alert(`Usuário ${userData.name} adicionado e salvo!`);
        setUserId(""); 
      } else {
        alert(saveResponse.error);
      }

    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Lobby - Empresa: <span className="text-blue-600">Tech Team</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 p-4 border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Informações Gerais</h2>

            <div className="space-y-3 text-sm text-gray-700">
              <p><span className="font-semibold">Vaga:</span> {lobby.vaga}</p>
              <p><span className="font-semibold">IA Gemini:</span> {lobby.sugestao}</p>
              <p><span className="font-semibold">Compatibilidade média:</span> {lobby.compatibilidadeMedia}%</p>
              <p><span className="font-semibold">Status:</span> {lobby.status}</p>
              <p><span className="font-semibold">Criado em:</span> {lobby.criadoEm}</p>
            </div>

            <div className="mt-8 flex flex-col space-y-3">
              
              {/* --- BOTÃO DA IA --- */}
              <button
                onClick={handleAIMatch}
                disabled={loadingIA}
                className={`w-full px-4 py-3 rounded-lg text-white font-medium shadow-md transition duration-150 flex items-center justify-center gap-2 mb-4
                  ${loadingIA ? "bg-purple-400 cursor-not-allowed" : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"}`}
              >
                {loadingIA ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    IA Analisando...
                  </>
                ) : (
                  <>
                    ✨Auto-Selecionar com IA
                  </>
                )}
              </button>
            

              <div className="border-t border-gray-200 my-2"></div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mt-2">Adicionar Manualmente</p>

              <input
                type="text"
                placeholder="Digite o ID (ex: user_4)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg mb-2"
              />
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-blue-100 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-200 transition duration-150 text-sm font-medium"
              >
                Convidar manualmente
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Lista de Candidatos</h2>
            
            <div className="flex flex-wrap gap-6 justify-start">
              {candidates.length === 0 && <p className="text-gray-500 w-full text-center mt-10">Nenhum candidato selecionado ainda.</p>}
              
              {candidates.map(candidate => (
                <div 
                  key={candidate.id} 
                  className={`relative w-full sm:w-56 border rounded-lg shadow-md p-4 flex flex-col items-center text-center 
                  ${candidate.origem === "Sugestão IA" ? "bg-purple-50 border-purple-300 ring-1 ring-purple-200" : "bg-white border-gray-200"}`}
                >
                  
                  {/* Ícone se for sugestão da IA */}
                  {candidate.origem === "Sugestão IA" && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-purple-700 bg-purple-200 px-2 py-0.5 rounded-full">
                      IA ✨
                    </span>
                  )}

                  <div className="w-24 h-24 bg-blue-300 rounded-full mb-3 flex items-center justify-center text-white font-medium text-xs">
                    Foto
                  </div>
                  <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Habilidades:</span> {candidate.habilidades ? candidate.habilidades.join(", ") : "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Compatibilidade:</span> {candidate.compatibilidade}%
                  </p>
                  <button className="mt-4 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 text-sm">
                    Ver perfil completo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ChatFlutuante />
    </div>
  );
}