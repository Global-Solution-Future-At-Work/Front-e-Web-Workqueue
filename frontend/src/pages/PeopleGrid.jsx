import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import fotohomem from "../assets/fotohomem.svg"; // Fallback image
import ChatFlutuante from '../components/ChatFlutuante';
// --- Componente Modal de Detalhes (Permanece Igual) ---
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
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-gray-500 dark:text-gray-400">
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
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sobre</h4>
            <p className="text-gray-600 dark:text-gray-300">{user.resumo}</p>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚡ Habilidades Técnicas</h4>
                <div className="flex flex-wrap gap-2">
                  {user.habilidadesTecnicas?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg text-sm font-medium">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.softSkills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-lg text-sm font-medium">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🎓 Formação</h4>
                <div className="space-y-3">
                  {user.formacao?.map((form, idx) => (
                    <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{form.curso}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{form.instituicao} • {form.ano}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💼 Experiência</h4>
                <div className="space-y-4">
                  {user.experiencias?.map((exp, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">{exp.cargo}</h5>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-300 whitespace-nowrap">{exp.inicio} - {exp.fim || "Atual"}</span>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{exp.empresa}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exp.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
              {user.projetos?.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🚀 Projetos</h4>
                  <div className="space-y-3">
                    {user.projetos.map((proj, idx) => (
                      <a key={idx} href={proj.link} target="_blank" rel="noreferrer" className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors group">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{proj.titulo}</p>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
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

// --- Componente Principal da Página ---
export default function PeopleGrid() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  // Estado para os filtros
  const [filters, setFilters] = useState({
    area: '',
    location: '',
    tech: ''
  });

  // Atualiza o estado dos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://127.0.0.1:3000/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(Array.isArray(data) ? data : [data]); 
        } else {
          console.error("Erro ao buscar usuários");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Lógica de filtragem memorizada para performance
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Filtro por Área (verifica 'area' ou 'cargo')
      const matchArea = filters.area === '' || 
        (user.area && user.area.toLowerCase().includes(filters.area.toLowerCase())) ||
        (user.cargo && user.cargo.toLowerCase().includes(filters.area.toLowerCase()));

      // Filtro por Localização
      const matchLocation = filters.location === '' || 
        (user.localizacao && user.localizacao.toLowerCase().includes(filters.location.toLowerCase()));

      // Filtro por Tecnologia (verifica dentro do array de habilidades)
      const matchTech = filters.tech === '' || 
        (user.habilidadesTecnicas && user.habilidadesTecnicas.some(tech => 
          tech.toLowerCase().includes(filters.tech.toLowerCase())
        ));

      return matchArea && matchLocation && matchTech;
    });
  }, [users, filters]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors pt-6 pb-12 px-4 sm:px-0">
      
      {/* Header e Botão Voltar */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Talentos WorkQueue</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* --- BARRA DE FILTROS --- */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Filtrar Candidatos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Filtro de Área */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <input
                type="text"
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
                placeholder="Área ou Cargo (ex: Design)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro de Localização */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Cidade ou Estado (ex: RJ)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro de Tecnologia */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <input
                type="text"
                name="tech"
                value={filters.tech}
                onChange={handleFilterChange}
                placeholder="Tecnologia (ex: React)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Carregando perfis...</p>
          </div>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                 <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhum candidato encontrado</h3>
                 <p className="text-gray-500 dark:text-gray-400">Tente ajustar seus filtros de busca.</p>
                 <button 
                    onClick={() => setFilters({area: '', location: '', tech: ''})}
                    className="mt-4 text-blue-600 hover:underline"
                 >
                    Limpar filtros
                 </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Renderiza a lista FILTRADA */}
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <img 
                          src={user.foto || fotohomem} 
                          alt={user.nome} 
                          className="w-24 h-24 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {user.nome}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{user.cargo}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{user.localizacao}</p>

                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {user.habilidadesTecnicas?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                            {tech}
                          </span>
                        ))}
                        {user.habilidadesTecnicas?.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md">
                            +{user.habilidadesTecnicas.length - 3}
                          </span>
                        )}
                      </div>

                      <button className="w-full py-2 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                        Ver Perfil Completo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
      <ChatFlutuante />
    </div>
  );
}