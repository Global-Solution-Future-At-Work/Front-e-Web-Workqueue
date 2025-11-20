import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Briefcase, GraduationCap, Award, Zap, ChevronDown, Check } from 'lucide-react';

import fotohomem from '../assets/fotohomem.svg'

const PerfilUser = () => {
  const [open, setOpen] = useState(false);

  const userData = {
    nome: "Rafael Souza",
    localizacao: "Curitiba, PR",
    cargo: "Desenvolvedor Full Stack",
    instituicao: "Next Code Labs",
    sobre: "Profissional apaixonado por análise de dados e IA aplicada. Acredito no poder das informações para impulsionar decisões estratégicas e humanas.",
    habilidade: "[ Python ] [ SQL ] [ Power BI ] [ Machine Learning ] [ Google Cloud ]",
    soft: "Soft Skills: Comunicação • Trabalho em equipe • Pensamento analítico • Curiosidade técnica Hobbies: Leitura sobre IA, corrida, xadrez",
    insights: "Compatibilidade média com vagas: 87%\nVisibilidade semanal: +12%\nÁreas mais compatíveis: Ciência de Dados, BI, IA aplicada",
    formacao: [
      {
        descricao: "🎓 Bacharelado em Ciência da Computação — FIAP (2020-2024)"
      },
    ],
    idiomas: "📘 Inglês (Avançado), Espanhol (Intermediário)",
    experiencias: [
      {
        titulo: "🧩 TechBridge Solutions — Analista de Dados (2023-Atual)",
        descricao: "Análise de dados, modelagem de dashboards e automação de relatórios com IA.",
      },
      {
        titulo: "🔹 DataLink — Estagiário em BI (2022-2023)",
        descricao: "Apoio em estruturação de KPIs e construção de pipelines de dados.",
      },
    ],
    isOwner: true 
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] py-8 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">

        {/* LADO ESQUERDO */}
        <div className="lg:w-3/4 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition">

            {/* BANNER */}
            <div className="bg-blue-600 h-32 rounded-t-lg relative"></div>

            {/* FOTO */}
            <div className="absolute left-8 top-24">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 bg-gray-300 dark:bg-gray-600 overflow-hidden shadow-md">
                <img src={fotohomem} alt={userData.nome} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* INFO */}
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
                    Cargo: <b>{userData.cargo}</b>
                  </p>

                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    Instituição: {userData.instituicao}
                  </p>
                </div>

                {/* BOTÕES */}
                <div className="flex gap-2 mt-2">

                  <button className="flex items-center text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full px-4 py-1.5 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                    <Mail size={16} className="mr-1" />
                    Editar Perfil
                  </button>

                  {userData.isOwner && (
                    <button className="bg-blue-600 text-white rounded-full px-4 py-1.5 font-semibold text-sm hover:bg-blue-700 transition">
                      Publicar vagas
                    </button>
                  )}

                </div>
              </div>

              {/* SESSÕES */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Sobre mim
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {userData.sobre}
                </p>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Formação e Idiomas
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {userData.formacao.map((item, index) => (
                    <li key={index}>{item.descricao}</li>
                  ))}
                  <li>{userData.idiomas}</li>
                </ul>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Experiências profissionais
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  {userData.experiencias.map((exp, index) => (
                    <li key={index}>
                      <p className="font-semibold">{exp.titulo}</p>
                      <p className="ml-5 text-sm">{exp.descricao}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SEÇÃO EXPANDIDA */}
              {open && (
                <div className="mb-4 animate-fadeIn">

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Habilidades Técnicas
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.habilidade}
                  </p>

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Insights da IA Gemini
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.insights}
                  </p>

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Soft Skills e Hobbies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.soft}
                  </p>
                </div>
              )}

              {/* BOTÕES FINAL */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setOpen(!open)}
                  className="text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {open ? "Ver menos" : "Ver mais"}
                  <ChevronDown size={16} className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                <button className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-700 shadow-md">
                  Recomendar profissional
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className="lg:w-1/4 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition">
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 font-medium">
              <li className="flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">
                Meu perfil
                <Briefcase size={18} className="text-gray-500 dark:text-gray-300" />
              </li>
              <li className="flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">
                Meus lobbies
                <Zap size={18} className="text-gray-500 dark:text-gray-300" />
              </li>
              <li className="flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">
                Recomendações
                <Award size={18} className="text-gray-500 dark:text-gray-300" />
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfilUser;