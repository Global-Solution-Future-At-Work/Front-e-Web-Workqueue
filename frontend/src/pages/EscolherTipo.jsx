import React from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

export default function EscolhaCadastro() {

  const handleChoice = (type) => {
    alert(`Você escolheu: ${type}. Redirecionando para o formulário de cadastro.`);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0F172A] p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-200 dark:border-gray-700">

        {/* LOGO */}
        <div className="mb-8">
          <img 
            src={logo}
            alt="WorkQueue Logo" 
            className="w-full h-full object-cover dark:invert dark:brightness-50" 
          />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Cadastre-se
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Crie sua conta na WorkQueue!
          </p>
        </div>

        {/* ESCOLHA */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-6">
            Escolha o tipo de conta para começar:
          </h2>

          <div className="space-y-4">

            {/* BOTÃO PROFISSIONAL */}
            <button
              onClick={() => window.location.href = '/cadastro-user'}
              className="w-full px-6 py-3 border border-blue-500 text-blue-500 dark:text-blue-300 dark:border-blue-400 rounded-full text-lg font-medium 
              hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-600 dark:hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-200 
              transition duration-150 shadow-sm"
            >
              Sou um profissional
            </button>

            {/* BOTÃO EMPRESA */}
            <button
              onClick={() => window.location.href = '/cadastro-empresa'}
              className="w-full px-6 py-3 border border-blue-500 text-blue-500 dark:text-blue-300 dark:border-blue-400 rounded-full text-lg font-medium 
              hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-600 dark:hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-200 
              transition duration-150 shadow-sm"
            >
              Sou uma empresa
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
