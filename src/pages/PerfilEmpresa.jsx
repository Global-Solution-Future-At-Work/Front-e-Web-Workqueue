import React from 'react';
import { Mail, MapPin, Briefcase, GraduationCap, Award, Zap, ChevronDown, Check, Pencil, Plus, Upload } from 'lucide-react';

import ChatFlutuante from '../components/ChatFlutuante';

const PerfilEmpresa = () => {
  const userData = {
    nome: "NextCode Labs",
    localizacao: "Curitiba, PR",
    setor: "Tecnologia e Inovação",
    tamanho: "50-200 funcionários",
    sobre: "A NextCode Labs é uma empresa de tecnologia focada em soluções escaláveis e integração de Inteligência Artificial. Nosso propósito é simplificar processos complexos e criar oportunidades humanas através da inovação. (Descrição breve)\nFundação: 2018\nMissão: Unir tecnologia e pessoas para acelerar o futuro do trabalho.\nVisão: Ser referência em soluções inteligentes e acessíveis.\nValores: Ética, inovação e colaboração.",
    vagas: "Desenvolvedor: Front-end | Florianópolis (Híbrido)\nCompatibilidade média dos candidatos: 82%",
    isOwner: true 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">

        <div className="lg:w-3/4 w-full">
          <div className="bg-white rounded-lg shadow-lg">

            <div className="bg-blue-600 h-32 rounded-t-lg relative">
              <div className="absolute left-8 top-16">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300 overflow-hidden shadow-md">
                  <img src="caminho-para-foto-rafael.jpg" alt={`Foto de ${userData.nome}`} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    {userData.nome}
                    <Check size={20} className="text-blue-600 bg-blue-100 rounded-full p-0.5 ml-2" />
                  </h2>
                  <p className="text-gray-500 mt-1 flex items-center text-sm">
                    <MapPin size={14} className="mr-1 text-red-500" />
                    {userData.localizacao}
                  </p>
                  <p className="text-gray-700 mt-2 text-base">
                    Setor: {userData.setor}
                  </p>
                  <p className="text-gray-700 mt-2 text-base">
                    Tamanho: {userData.tamanho}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 mt-3">
                  <button className="flex items-center text-blue-600 border border-blue-600 rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-50">
                    <Pencil size={16} className="mr-2" />
                    Editar Perfil
                  </button>

                  {userData.isOwner && (
                      <button className="flex items-center bg-blue-600 text-white rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-700">
                        <Plus size={16} className="mr-2" />
                        Publicar Vaga
                      </button>
                  )}

                  <button className='flex items-center bg-gray-200 text-gray-700 rounded-full px-4 py-2 font-semibold text-sm hover:bg-gray-300'>
                    <Upload size={16} className="mr-2" />
                    Criar Lobby
                  </button>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Sobre a Empresa
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {userData.sobre}
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Vagas Abertas
                </h3>
                <p className='whitespace-pre-line'>
                    {userData.vagas}
                </p>
              </div>

              
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <button className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700">
                  Ver mais
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <button className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-700 shadow-md">
                  Recomendar profissional
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
        <ChatFlutuante />
    </div>
  );
};

export default PerfilEmpresa;