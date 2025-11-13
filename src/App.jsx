// src/App.jsx
import React from 'react';
import './App.css'; // Opcional, mas você pode adicionar estilos custom se precisar

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🤖</span> {/* Ícone aproximado: pessoa com balão de chat */}
          </div>
          <span className="text-lg font-bold">WorkQueue</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Conteúdo</a>
          <a href="#" className="hover:underline">Sobre</a>
          <a href="#" className="hover:underline">Login</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-sm bg-transparent border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-900">
            Descubra novas oportunidades
          </button>
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black">🌙</div> {/* Ícone lua aproximado */}
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="border-2 border-blue-900 rounded-lg p-6 max-w-md mx-auto md:mx-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-900">WorkQueue</h1>
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-2">Where AI meets human potential.</p>
          </div>
          <h2 className="text-2xl font-bold mt-6 text-center md:text-left">Conecte talentos e oportunidades com IA</h2>
          <p className="mt-2 text-center md:text-left text-gray-600">
            Recrutamento inteligente, Lobbies de talentos, Recomendações automáticas
          </p>
        </div>
        <div className="md:w-1/2 flex flex-col items-center space-y-4">
          <button className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-800 w-full max-w-xs">
            Entrar com e-mail
          </button>
          <p className="text-sm text-gray-600 text-center">Ainda não faz parte da WorkQueue?</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 w-full max-w-xs">
            Cadastre-se
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 px-4 py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">👤</span> {/* Ícone aproximado */}
            </div>
            <span className="font-semibold">Links Úteis</span>
          </div>
          <nav className="flex space-x-4 text-sm">
            <a href="#" className="hover:underline">Contato</a>
            <a href="#" className="hover:underline">Empresas</a>
            <a href="#" className="hover:underline">Usuários</a>
            <a href="#" className="hover:underline">Lobbies</a>
            <a href="#" className="hover:underline">Geral</a>
            <a href="#" className="hover:underline">Diretores</a>
          </nav>
          <div className="flex items-center space-x-2">
            <a href="#" className="text-blue-900">@workqueue</a>
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">🐦</div> {/* Ícone X/Twitter aproximado */}
            <button className="ml-2 text-gray-500">×</button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          © 2025 todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;