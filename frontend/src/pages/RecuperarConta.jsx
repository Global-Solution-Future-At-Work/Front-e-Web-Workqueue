import React, { useState } from 'react';

export default function RecuperarConta() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  });

  const [buttonText, setButtonText] = useState("Próximo");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText("Enviado com sucesso! ✔️");

    console.log('Dados enviados:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      {/* Card Principal */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100 relative overflow-hidden">
        
        {/* Detalhe decorativo no topo (Barra azul) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        <div className="text-center">
          
          {/* Ícone para dar contexto visual */}
          <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Recuperação de Conta
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Está com problemas para logar?
          </p>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Entre em contato com o suporte
            </p>
            
            {/* Link para abrir o email direto */}
            <a 
              href="mailto:work.queueai@gmail.com" 
              className="block text-1xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors break-all"
            >
              work.queueai@gmail.com
            </a>
          </div>

          <button 
            onClick={() => window.history.back()} 
            className="mt-8 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors underline"
          >
            Voltar para o login
          </button>

        </div>
      </div>
    </div>
  );
}