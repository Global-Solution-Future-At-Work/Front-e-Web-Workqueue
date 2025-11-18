import React from 'react';

import ChatFlutuante from '../components/ChatFlutuante';


const lobbyData = {
  vaga: "Desenvolvedor Front-End",
  sugestao: "IA Gemini: Sugestão automática de candidatos",
  compatibilidadeMedia: 86,
  status: "Ativo",
  criadoEm: "10/11/2025",
};

const candidates = [
  {
    id: 1,
    name: "Nome do Candidato A",
    habilidades: ["React", "JavaScript", "Tailwind"],
    compatibilidade: 92,
  },
  {
    id: 2,
    name: "Nome do Candidato B",
    habilidades: ["Vue.js", "CSS", "Design"],
    compatibilidade: 88,
  },
  {
    id: 3,
    name: "Nome do Candidato C",
    habilidades: ["React Native", "TypeScript", "Redux"],
    compatibilidade: 78,
  },
];


export default function Lobby() {
  const handleInvite = () => {
    alert("Convidar manualmente acionado!");
  };

  const handleUpdateCriteria = () => {
    alert("Atualizar critérios da IA acionado!");
  };
  
  const handleSelectCandidate = () => {
    alert("Selecionar candidato acionado!");
  };
  
  const handleRemoveCandidate = () => {
    alert("Remover candidato acionado!");
  };
  
  const handleGenerateOtherLobby = () => {
    alert("Gerar outro lobby acionado!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
        
         
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Lobby - Empresa: <span className="text-blue-600">NextCode Labs</span>
          </h1>
          <img
            src="/nextcode-logo.png" 
            alt="NextCode Labs Logo"
            className="w-16 h-auto"
          />
        </div>

        
        <div className="flex flex-col lg:flex-row gap-8">
          
          
          <div className="w-full lg:w-1/3 p-4 border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Informações Gerais</h2>
            
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Vaga:</span> {lobbyData.vaga}
              </p>
              <p>
                <span className="font-semibold">IA Gemini:</span> {lobbyData.sugestao}
              </p>
              <p>
                <span className="font-semibold">Compatibilidade média:</span>{" "}
                {lobbyData.compatibilidadeMedia}%
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-1">Status: Lobby</span>
                <span className="text-green-600 font-bold flex items-center">
                    {lobbyData.status}
                    <svg className="w-4 h-4 ml-1 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                </span>
              </p>
              <p>
                <span className="font-semibold">Criado em:</span> {lobbyData.criadoEm}
              </p>
            </div>
            
            <div className="mt-8 flex flex-col space-y-3">
              <button
                onClick={handleInvite}
                className="px-4 py-2 bg-blue-100 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-200 transition duration-150 text-sm font-medium"
              >
                Convidar manualmente
              </button>
              <button
                onClick={handleUpdateCriteria}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-150 text-sm font-medium"
              >
                Atualizar critérios da IA
              </button>
            </div>
          </div>
          
          
          <div className="w-full lg:w-2/3 p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Lista de Candidatos sugeridos
            </h2>
            
            <div className="flex flex-wrap gap-6 justify-start">
              {candidates.map(candidate => (
                <div 
                  key={candidate.id} 
                  className="w-full sm:w-56 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-blue-300 rounded-full mb-3 flex items-center justify-center text-white font-medium text-xs">
                    Foto do candidato aqui
                  </div>
                  
                  <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Principais habilidades:</span>{" "}
                    {candidate.habilidades.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Compatibilidade (%) com a vaga:</span>{" "}
                    {candidate.compatibilidade}%
                  </p>
                  
                  <button className="mt-4 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 text-sm">
                    Ver perfil completo
                  </button>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        
        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end items-center space-x-3">
            <button
                onClick={handleGenerateOtherLobby}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 text-sm font-medium"
            >
                Gerar outro lobby
            </button>
            <button
                onClick={handleSelectCandidate}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 text-sm font-medium"
            >
                Selecionar candidato
            </button>
            <button
                onClick={handleRemoveCandidate}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 text-sm font-medium"
            >
                Remover candidato
            </button>
        </div>

      </div>
      <ChatFlutuante />
    </div>
  );
}