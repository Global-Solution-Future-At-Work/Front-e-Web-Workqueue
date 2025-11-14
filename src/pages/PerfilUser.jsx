import React from 'react';
import { Mail, MapPin, Briefcase, GraduationCap, Award, Zap, ChevronDown, Check } from 'lucide-react';

const PerfilEmpresa = () => {
  const userData = {
    nome: "Rafael Souza",
    localizacao: "Curitiba, PR",
    cargo: "Desenvolvedor Full Stack",
    instituicao: "Next Code Labs",
    sobre: "Profissional apaixonado por análise de dados e IA aplicada. Acredito no poder das informações para impulsionar decisões estratégicas e humanas. (Breve descrição)",
    formacao: [
      {
        icone: <GraduationCap size={16} className="text-blue-600 inline mr-2" />,
        descricao: "Bacharelado em Ciência da Computação — FIAP (2020-2024)"
      },
    ],
    idiomas: "Inglês (Avançado), Espanhol (Intermediário)",
    experiencias: [
      {
        icone: <Zap size={16} className="text-blue-600 inline mr-2" />,
        titulo: "TechBridge Solutions — Analista de Dados (2023-Atual)",
        descricao: "Análise de dados, modelagem de dashboards e automação de relatórios com IA.",
      },
      {
        icone: <Zap size={16} className="text-blue-600 inline mr-2" />,
        titulo: "DataLink — Estagiário em BI (2022-2023)",
        descricao: "Apoio em estruturação de KPIs e construção de pipelines de dados.",
      },
    ],
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
                    Cargo: **{userData.cargo}**
                  </p>
                  <p className="text-gray-500 text-sm">
                    Instituição: {userData.instituicao}
                  </p>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <button className="flex items-center text-blue-600 border border-blue-600 rounded-full px-4 py-1.5 font-semibold text-sm hover:bg-blue-50">
                    <Mail size={16} className="mr-1" />
                    Enviar mensagem
                  </button>
                  {userData.isOwner && (
                    <div className="relative">
                      <button className="bg-blue-600 text-white rounded-full px-4 py-1.5 font-semibold text-sm hover:bg-blue-700">
                        Editar Perfil
                      </button>
                      
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Sobre mim
                </h3>
                <p className="text-gray-700">
                  {userData.sobre}
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Formação e Idiomas
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {userData.formacao.map((item, index) => (
                    <li key={index} className="flex items-start">
                      {item.icone}
                      {item.descricao}
                    </li>
                  ))}
                  <li className="flex items-start">
                    <Award size={16} className="text-blue-600 inline mr-2 mt-0.5" />
                    {userData.idiomas}
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Experiências profissionais
                </h3>
                <ul className="space-y-4 text-gray-700">
                  {userData.experiencias.map((exp, index) => (
                    <li key={index}>
                      <p className="font-semibold flex items-center">
                        {exp.icone}
                        {exp.titulo}
                      </p>
                      <p className="ml-5 text-sm">{exp.descricao}</p>
                    </li>
                  ))}
                </ul>
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

        <div className="lg:w-1/4 w-full">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="space-y-4 text-gray-700 font-medium">
              <li className="flex items-center justify-between hover:text-blue-600 cursor-pointer">
                Meu perfil
                <Briefcase size={18} className="text-gray-500" />
              </li>
              <li className="flex items-center justify-between hover:text-blue-600 cursor-pointer">
                Meus lobbies
                <Zap size={18} className="text-gray-500" />
              </li>
              <li className="flex items-center justify-between hover:text-blue-600 cursor-pointer">
                Recomendações
                <Award size={18} className="text-gray-500" />
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfilEmpresa;