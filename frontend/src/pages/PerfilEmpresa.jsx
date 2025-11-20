import React, { useState } from 'react';
import { Mail, MapPin, Briefcase, GraduationCap, Award, Zap, ChevronDown, Check, Pencil, Plus, Upload } from 'lucide-react';

import ChatFlutuante from '../components/ChatFlutuante';

import { useNavigate } from "react-router-dom";

import fotoempresa from "../assets/fotoempresa.svg"

const PerfilEmpresa = () => {
  const [open, setOpen] = useState(false);

  const userData = {
    nome: "NextCode Labs",
    localizacao: "Curitiba, PR",
    setor: "Tecnologia e Inovação",
    tamanho: "50-200 funcionários",
    sobre: "A NextCode Labs é uma empresa de tecnologia focada em soluções escaláveis e integração de Inteligência Artificial. Nosso propósito é simplificar processos complexos e criar oportunidades humanas através da inovação. (Descrição breve)\nFundação: 2018\nMissão: Unir tecnologia e pessoas para acelerar o futuro do trabalho.\nVisão: Ser referência em soluções inteligentes e acessíveis.\nValores: Ética, inovação e colaboração.",
    vagas: "Desenvolvedor: Front-end | Florianópolis (Híbrido)\nCompatibilidade média dos candidatos: 82%",
    conecte: "🌐 Site oficial: www.nextcodelabs.com\n💼 LinkedIn: NextCode Labs\n📧 E-mail: contato@nextcodelabs.com\n📍 Endereço: Florianópolis – SC",
    insights: "👥 Total de candidatos alcançados: 312\n🎯 Compatibilidade média geral: 84%\n⏱️ Tempo médio de fechamento de vaga: 6 dias\n💡 Áreas com maior engajamento: Desenvolvimento, IA, UX Design",
    lobbies: "[Lobby – Desenvolvedores React]\n5 candidatos sugeridos pela IA\nCompatibilidade média: 85%",
    isOwner: true
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] py-8 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">

        {/* CARD PRINCIPAL */}
        <div className="lg:w-3/4 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition">

            {/* BANNER */}
            <div className="bg-blue-600 h-32 rounded-t-lg relative">
              <div className="absolute left-8 top-16">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 bg-gray-300 dark:bg-gray-600 overflow-hidden shadow-md">
                  <img src={fotoempresa} alt={userData.nome} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* CONTEÚDO */}
            <div className="pt-20 px-8 pb-8">

              {/* HEADER */}
              <div className="flex justify-between items-start mb-4">

                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    {userData.nome}
                    <Check size={20} className="text-blue-600 bg-blue-100 dark:bg-blue-900 rounded-full p-0.5 ml-2" />
                  </h2>

                  <p className="text-gray-500 dark:text-gray-300 mt-1 flex items-center text-sm">
                    <MapPin size={14} className="mr-1 text-red-500" />
                    {userData.localizacao}
                  </p>

                  <p className="text-gray-700 dark:text-gray-200 mt-2 text-base">
                    Setor: {userData.setor}
                  </p>

                  <p className="text-gray-700 dark:text-gray-200 mt-2 text-base">
                    Tamanho: {userData.tamanho}
                  </p>
                </div>

                {/* BOTÕES */}
                <div className="flex flex-col gap-3 mt-3">

                  <button className="flex items-center text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                    <Pencil size={16} className="mr-2" />
                    Editar Perfil
                  </button>

                  {userData.isOwner && (
                    <button className="flex items-center bg-blue-600 text-white rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-700 transition">
                      <Plus size={16} className="mr-2" />
                      Publicar Vaga
                    </button>
                  )}

                  <button className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-4 py-2 font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    <Upload size={16} className="mr-2" />
                    Criar Lobby
                  </button>
                </div>
              </div>

              {/* SOBRE */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Sobre a Empresa
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {userData.sobre}
                </p>
              </div>

              {/* VAGAS */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Vagas Abertas
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {userData.vagas}
                </p>
              </div>

              {/* EXPANDIR */}
              {open && (
                <div className="mb-4 animate-fadeIn">

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Lobbies Ativos</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.lobbies}
                  </p>
                  <button className="bg-blue-600 text-white rounded-full px-3 py-2 font-semibold text-sm hover:bg-blue-700 transition shadow-sm">
                    Visualizar Lobby
                  </button>

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Insights da IA Gemini
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.insights}
                  </p>

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Conecte-se conosco
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.conecte}
                  </p>
                </div>
              )}

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setOpen(!open)}
                  className="text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition"
                >
                  {open ? "Ver menos" : "Ver mais"}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`}
                  />
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
