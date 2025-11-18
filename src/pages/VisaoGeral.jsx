import React from 'react';

import ChatFlutuante from '../components/ChatFlutuante';


const generalIndicators = {
  usuariosAtivos: 4820,
  empresasCadastradas: 312,
  vagasAtivas: 1126,
  lobbiesEmExecucao: 78,
};

const iaStatus = {
  conexao: "Estável",
  ultimaSincronizacao: "há 2 minutos",
  funcoesAtivas: [
    "Recomendações automáticas",
    "Criação de lobbies",
    "Análise de compatibilidade",
  ],
};


export default function VisaoGeral() {
  
  const handleReiniciarIntegracao = () => { console.log("Reiniciar Integração acionado!"); };
  const handleGerenciarUsuarios = () => { console.log("Gerenciar Usuários acionado!"); };
  const handleGerenciarEmpresas = () => { console.log("Gerenciar Empresas acionado!"); };
  const handleGerenciarVagas = () => { console.log("Gerenciar Vagas acionado!"); };
  const handleVisualizarGrafico = () => { console.log("Visualizar Gráfico acionado!"); };

  return (
    
    <div className="min-h-screen bg-gray-100">
      
      
      <div className="bg-blue-800 h-32"></div>

      
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg relative -mt-16 mb-12">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Visão Geral do Sistema
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

         
          <div>
           
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Geral</h2>
            <div className="space-y-2 text-sm text-gray-700 mb-8">
              <p>
                <span className="font-semibold">Indicador:</span> Valor de exemplo
              </p>
              <p className="flex items-center">
                <span className="text-blue-600 mr-2">👥</span>
                <span className="font-semibold">Usuários ativos:</span>{" "}
                {generalIndicators.usuariosAtivos.toLocaleString()}
              </p>
              <p className="flex items-center">
                <span className="text-gray-600 mr-2">🏢</span>
                <span className="font-semibold">Empresas cadastradas:</span>{" "}
                {generalIndicators.empresasCadastradas}
              </p>
              <p className="flex items-center">
                <span className="text-green-600 mr-2">💼</span>
                <span className="font-semibold">Vagas ativas:</span>{" "}
                {generalIndicators.vagasAtivas.toLocaleString()}
              </p>
              <p className="flex items-center">
                <span className="text-purple-600 mr-2">📦</span>
                <span className="font-semibold">Lobbies em execução:</span>{" "}
                {generalIndicators.lobbiesEmExecucao}
              </p>
            </div>

            
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Gerenciar Usuários Profissionais
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                (Ao abrir esse perfil, abrir uma tabela com a lista dos profissionais)
              </p>
              <button
                onClick={handleGerenciarUsuarios}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
              >
                Gerenciar Usuários
              </button>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Controle de Vagas Ativas
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                (Ao abrir esse perfil, abrir uma tabela com a lista das vagas ativas)
              </p>
              <button
                onClick={handleGerenciarVagas}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
              >
                Gerenciar Vagas
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Gerenciar Empresas Parceiras
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                (Ao abrir esse perfil, abrir uma tabela com a lista das empresas)
              </p>
              <button
                onClick={handleGerenciarEmpresas}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
              >
                Gerenciar Empresas
              </button>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Status da integração com IA
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center">
                  <span className="text-green-500 mr-2">🟢</span>
                  <span className="font-semibold">Conexão:</span> {iaStatus.conexao}
                </p>
                <p className="flex items-center">
                  <span className="text-blue-400 mr-2">⏱️</span>
                  <span className="font-semibold">Última sincronização:</span>{" "}
                  {iaStatus.ultimaSincronizacao}
                </p>
                <p className="font-semibold mt-4">Funções ativas:</p>
                <ul className="list-disc ml-5 text-gray-600 space-y-1">
                  {iaStatus.funcoesAtivas.map((func, index) => (
                    <li key={index}>{func}</li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
      <ChatFlutuante />
    </div>
  );
}