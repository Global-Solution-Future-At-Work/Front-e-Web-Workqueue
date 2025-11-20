import React from 'react';
import ChatFlutuante from '../components/ChatFlutuante';

const AccountSelection = () => {
  return (
    <div className="grow flex flex-col items-center justify-center p-8 bg-white dark:bg-[#0F172A] transition-colors">
      
      {/* Logo */}
      <div className="text-center mb-10 dark:invert dark:brightness-50">
        <div className="flex justify-center items-center mb-4">
          <div className="text-4xl text-gray-800 dark:text-gray-100 mr-2">
             <span role="img" aria-label="WorkQueue Icon">💬</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            WorkQueue
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Where AI meets human potential.
        </p>
      </div>

      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Cadastre-se
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Crie sua conta na WorkQueue!
        </p>
      </div>

      {/* Subtítulo */}
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 font-light">
        Escolha o tipo de conta para começar:
      </p>

      {/* Botões */}
      <div className="space-y-4 w-full max-w-sm">
        
        <button 
          onClick={() => console.log('Navegar para cadastro de profissional')}
          className="
            w-full py-3 px-6 text-lg font-medium 
            text-blue-700 dark:text-blue-400 
            border-2 border-blue-400 
            dark:border-blue-500 
            rounded-lg 
            hover:bg-blue-50 dark:hover:bg-blue-900/20 
            transition duration-150 ease-in-out 
            flex items-center justify-center
          "
        >
          Sou um profissional
        </button>
        
        <button 
          onClick={() => console.log('Navegar para cadastro de empresa')}
          className="
            w-full py-3 px-6 text-lg font-medium 
            text-blue-700 dark:text-blue-400 
            border-2 border-blue-400 
            dark:border-blue-500 
            rounded-lg 
            hover:bg-blue-50 dark:hover:bg-blue-900/20 
            transition duration-150 ease-in-out
          "
        >
          Sou uma empresa
        </button>
      </div>

      <ChatFlutuante />

    </div>
  );
};

export default AccountSelection;
