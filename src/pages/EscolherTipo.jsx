import React from 'react';

import { Link } from 'react-router-dom';

const logoUrl = "/workqueue-logo.png"; 

export default function EscolhaCadastro() {

  const handleChoice = (type) => {
    alert(`Você escolheu: ${type}. Redirecionando para o formulário de cadastro.`);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full text-center">
        
        <div className="mb-8">
            <img 
              src={logoUrl} 
              alt="WorkQueue Logo" 
              className="mx-auto w-24 h-auto mb-4" 
            />
            <h1 className="text-3xl font-bold text-gray-800">
                Cadastre-se
            </h1>
            <p className="text-gray-600 mt-1">
                Crie sua conta na WorkQueue!
            </p>
        </div>

        
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Escolha o tipo de conta para começar:
            </h2>
            
            <div className="space-y-4">
                
                <button
                    onClick={() => window.location.href = '/cadastro-user'}
                    className="w-full px-6 py-3 border border-blue-500 text-blue-500 rounded-full text-lg font-medium hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition duration-150 shadow-sm"
                >
                    Sou um profissional
                </button>

                
                <button
                    onClick={() => window.location.href = '/cadastro-empresa'}
                    className="w-full px-6 py-3 border border-blue-500 text-blue-500 rounded-full text-lg font-medium hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition duration-150 shadow-sm"
                >
                    Sou uma empresa
                </button>
            </div>
        </div>
        
      </div>
    </div>
  );
}