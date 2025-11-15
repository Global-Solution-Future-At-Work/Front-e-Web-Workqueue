import React from 'react';

import ChatFlutuante from '../components/ChatFlutuante';
import { ChartGantt } from 'lucide-react';

const AccountSelection = () => {
  return (
    
    <div className="grow flex flex-col items-center justify-center p-8 bg-white">
      
     
      <div className="text-center mb-10">
        <div className="flex justify-center items-center mb-4">
          <div className="text-4xl text-gray-800 mr-2">
             <span role="img" aria-label="WorkQueue Icon">💬</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">WorkQueue</h1>
        </div>
        <p className="text-sm text-gray-500">Where AI meets human potential.</p>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-gray-800 mb-2">
          Cadastre-se
        </h2>
        <p className="text-lg text-gray-600">
          Crie sua conta na WorkQueue!
        </p>
      </div>

      <p className="text-xl text-gray-700 mb-8 font-light">
        Escolha o tipo de conta para começar:
      </p>

      <div className="space-y-4 w-full max-w-sm">
        
        <button 
          onClick={() => console.log('Navegar para cadastro de profissional')}
          className="w-full py-3 px-6 text-lg font-medium text-blue-700 border-2 border-blue-400 rounded-lg 
                     hover:bg-blue-50 transition duration-150 ease-in-out flex items-center justify-center"
        >
          Sou um profissional
          <img 
            src="/path/to/small-profile-image.png" 
            alt="Ícone de perfil"
            className="w-8 h-8 rounded-full ml-4"
          />
        </button>
        
        <button 
          onClick={() => console.log('Navegar para cadastro de empresa')}
          className="w-full py-3 px-6 text-lg font-medium text-blue-700 border-2 border-blue-400 rounded-lg 
                     hover:bg-blue-50 transition duration-150 ease-in-out"
        >
          Sou uma empresa
        </button>
        
      </div>

      <ChatFlutuante />

    </div>
  );
};

export default AccountSelection;