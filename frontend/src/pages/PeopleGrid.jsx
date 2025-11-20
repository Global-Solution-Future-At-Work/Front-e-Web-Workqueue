import React from 'react';
import fotohomem from "../assets/fotohomem.svg"; // Ajuste o caminho conforme seu projeto

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        
        {/* Header do Modal */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Perfil Profissional</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Cabeçalho do Perfil */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={user.foto || fotohomem} 
              alt={user.nome} 
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
            />
            <div className="text-center sm:text-left grow">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{user.nome}</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{user.cargo}</p>
              
              {/* AREA: String simples */}
              {user.area && (
                <span className="inline-block mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium border border-gray-200 dark:border-gray-600">
                  {user.area}
                </span>
              )}

              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{user.localizacao}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sobre</h4>
            <p className="text-gray-600 dark:text-gray-300">{user.resumo}</p>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* --- COLUNA DA ESQUERDA --- */}
            <div className="space-y-6">
              
              {/* Habilidades Técnicas */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  ⚡ Habilidades Técnicas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.habilidadesTecnicas?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  🧠 Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.softSkills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* IDIOMAS (Corrigido para ler Objeto: {idioma, nivel}) */}
              {user.idiomas && user.idiomas.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    🌎 Idiomas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.idiomas.map((item, idx) => (
                      <div key={idx} className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-lg text-sm font-medium flex items-center gap-2">
                        <span>{item.idioma}</span>
                        {/* Separador visual */}
                        <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                        <span className="text-xs opacity-80 uppercase tracking-wide">{item.nivel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ÁREAS DE INTERESSE (Lista de Strings) */}
              {user.areaInteresses && user.areaInteresses.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    ❤️ Áreas de Interesse
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.areaInteresses.map((interesse, idx) => (
                      <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 rounded-lg text-sm font-medium">
                        {interesse}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Formação */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  🎓 Formação
                </h4>
                <div className="space-y-3">
                  {user.formacao?.map((form, idx) => (
                    <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{form.curso}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{form.instituicao} • {form.ano}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CERTIFICAÇÕES (Lista de Strings) */}
              {user.certificacoes && user.certificacoes.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    📜 Certificações
                  </h4>
                  <ul className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    {user.certificacoes.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* --- COLUNA DA DIREITA --- */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  💼 Experiência
                </h4>
                <div className="space-y-4">
                  {user.experiencias?.map((exp, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">{exp.cargo}</h5>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-300 whitespace-nowrap">
                          {exp.inicio} - {exp.fim || "Atual"}
                        </span>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{exp.empresa}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exp.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {user.projetos?.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                    🚀 Projetos
                  </h4>
                  <div className="space-y-3">
                    {user.projetos.map((proj, idx) => (
                      <a key={idx} href={proj.link} target="_blank" rel="noreferrer" className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors group bg-white dark:bg-gray-800">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {proj.titulo}
                          </p>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{proj.descricao}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;