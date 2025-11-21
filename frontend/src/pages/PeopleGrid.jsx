import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import fotohomem from "../assets/fotohomem.svg";
import ChatFlutuante from '../components/ChatFlutuante';

const ensureArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') return data.split(',').map(s => s.trim());
  return [data];
};

const normalizeExperience = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    return [{ cargo: data, empresa: "Empresa não inf.", inicio: "", fim: "", descricao: "" }];
  }
  return [];
};

const normalizeEducation = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    return [{ curso: data, instituicao: "", ano: "" }];
  }
  return [];
};

const normalizeProjects = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return [];
};

// --- MessageModal Corrigido ---
const MessageModal = ({ isOpen, onClose, targetUser }) => {
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
        alert("Erro: Usuário não autenticado. Faça login novamente.");
        setLoading(false);
        return;
    }

    try {
      // 1. Obter dados do usuário logado (quem envia)
      const authResponse = await fetch('http://127.0.0.1:3000/datajwt', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!authResponse.ok) {
        throw new Error("Falha ao validar token do usuário.");
      }

      const authData = await authResponse.json();
      
      // Pegamos ID e Role de quem está logado
      const { id, role } = authData.jwt_data; 

      // 2. Montar Payload
      // Cenário: Uma Empresa (logada) envia mensagem para um Usuário/Talento (targetUser)
      
      const payload = {
        mensagem: mensagem,
        // O destinatário da mensagem é o usuário do card que clicamos
        id_user: targetUser.id, 
        
        // O remetente (contexto da conversa) é a empresa logada
        // Se quem estiver logado não for empresa, mandamos null (o backend vai recusar, pois é regra de negócio)
        id_empresa: role === 'empresa' ? id : null, 
        
        // CAMPO NOVO OBRIGATÓRIO: Quem de fato clicou no botão "Enviar"
        enviado_por: id 
      };

      // Validação básica antes de enviar para evitar 400 desnecessário
      if (!payload.id_empresa) {
         alert("Apenas contas do tipo 'Empresa' podem iniciar conversas com talentos.");
         setLoading(false);
         return;
      }

      // 3. Enviar
      const response = await fetch('http://127.0.0.1:3000/mensagem', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`Mensagem enviada para ${targetUser.nome}!`);
        setMensagem("");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Erro ao enviar: ${errorData.error || 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert('Erro ao processar solicitação: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            Mensagem para {targetUser.nome}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sua mensagem</label>
            <textarea 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none h-32"
              placeholder={`Olá ${targetUser.nome}, gostaríamos de marcar uma entrevista...`}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
              {loading ? 'Enviando...' : (
                <>
                  <span>Enviar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal de Recomendação ---
const RecommendationModal = ({ isOpen, onClose, userId, userName }) => {
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:3000/recomendacao', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id_user: userId,
          mensagem: mensagem
        })
      });

      if (response.ok) {
        alert('Recomendação enviada com sucesso!');
        setMensagem("");
        onClose();
      } else {
        alert('Erro ao enviar recomendação.');
      }
    } catch (error) {
      console.error("Erro:", error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recomendar {userName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sua mensagem</label>
            <textarea 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none h-32"
              placeholder="Escreva aqui porque essa pessoa é um bom profissional..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">{loading ? 'Enviando...' : 'Enviar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Modal de Detalhes (UserModal) ---
const UserModal = ({ user, onClose }) => {
  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);

  if (!user) return null;

  const experiencias = normalizeExperience(user.experiencias);
  const formacao = normalizeEducation(user.formacao);
  const projetos = normalizeProjects(user.projetos);
  const habilidades = ensureArray(user.habilidadesTecnicas);
  const softSkills = ensureArray(user.softSkills);
  const idiomas = ensureArray(user.idiomas);
  const certificacoes = ensureArray(user.certificacoes);
  const interesses = ensureArray(user.areaInteresses);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
           
          {/* Header */}
          <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Perfil Profissional</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Info Principal */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={user.foto || fotohomem} 
                alt={user.nome} 
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
              />
              <div className="text-center sm:text-left grow">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{user.nome}</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{user.cargo || "Cargo não informado"}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{user.localizacao || "Localização não informada"}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span>{user.email}</span>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="mt-4 flex justify-center sm:justify-start gap-3 flex-wrap">
                  {/* Botão de Recomendação (Verde) */}
                  <button 
                    onClick={() => setIsRecModalOpen(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-full shadow-md transition-all hover:shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                    Recomendar
                  </button>

                  {/* Botão de Mensagem (Azul) */}
                  <button 
                    onClick={() => setIsMsgModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full shadow-md transition-all hover:shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    Mensagem
                  </button>
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sobre</h4>
              <p className="text-gray-600 dark:text-gray-300">{user.resumo || "Sem resumo disponível."}</p>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
              {/* ESQUERDA */}
              <div className="space-y-6">
                {/* Habilidades */}
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">⚡ Habilidades Técnicas</h4>
                  <div className="flex flex-wrap gap-2">
                    {habilidades.length > 0 ? habilidades.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg text-sm font-medium">{skill}</span>
                    )) : <span className="text-sm text-gray-500">Nenhuma cadastrada</span>}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🧠 Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.length > 0 ? softSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 rounded-lg text-sm font-medium">{skill}</span>
                    )) : <span className="text-sm text-gray-500">Nenhuma cadastrada</span>}
                  </div>
                </div>

                 {/* Idiomas */}
                 {idiomas.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🌎 Idiomas</h4>
                      <div className="flex flex-wrap gap-2">
                        {idiomas.map((item, idx) => {
                            const nome = typeof item === 'object' ? item.idioma : item;
                            const nivel = typeof item === 'object' ? item.nivel : '';
                            return (
                              <div key={idx} className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 rounded-lg text-sm font-medium flex items-center gap-2">
                                <span>{nome}</span>
                                {nivel && <span className="text-xs opacity-80 uppercase tracking-wide">({nivel})</span>}
                              </div>
                            )
                        })}
                      </div>
                    </div>
                  )}

                {/* Certificações */}
                {certificacoes.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">📜 Certificações</h4>
                    <ul className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      {certificacoes.map((cert, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-yellow-500 mt-0.5">★</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                 {/* Interesses */}
                 {interesses.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">❤️ Áreas de Interesse</h4>
                    <div className="flex flex-wrap gap-2">
                      {interesses.map((int, idx) => (
                        <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 rounded-lg text-sm font-medium">{int}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formação */}
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🎓 Formação</h4>
                  <div className="space-y-3">
                    {formacao.length > 0 ? formacao.map((form, idx) => (
                      <div key={idx} className="border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{form.curso}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{form.instituicao} {form.ano && `• ${form.ano}`}</p>
                      </div>
                    )) : <p className="text-sm text-gray-500">Não informada</p>}
                  </div>
                </div>
              </div>

              {/* DIREITA - Experiência e Projetos */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">💼 Experiência</h4>
                  <div className="space-y-4">
                    {experiencias.length > 0 ? experiencias.map((exp, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h5 className="font-semibold text-gray-800 dark:text-gray-200">{exp.cargo}</h5>
                          <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {exp.inicio || "Data não inf."} - {exp.fim || "Atual"}
                          </span>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{exp.empresa}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exp.descricao}</p>
                      </div>
                    )) : <p className="text-sm text-gray-500">Nenhuma experiência cadastrada</p>}
                  </div>
                </div>
                
                {projetos.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">🚀 Projetos</h4>
                    <div className="space-y-3">
                      {projetos.map((proj, idx) => (
                        <a key={idx} href={proj.link || "#"} target="_blank" rel="noreferrer" className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors group bg-white dark:bg-gray-800">
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

      {/* Integração do Modal de Recomendação */}
      <RecommendationModal 
        isOpen={isRecModalOpen} 
        onClose={() => setIsRecModalOpen(false)} 
        userId={user.id}
        userName={user.nome}
      />

      {/* Integração do Modal de Mensagem */}
      <MessageModal 
        isOpen={isMsgModalOpen}
        onClose={() => setIsMsgModalOpen(false)}
        targetUser={user}
      />
    </>
  );
};

// --- Componente Principal (PeopleGrid) ---
export default function PeopleGrid() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({ area: '', location: '', tech: '' });

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

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const habilidades = ensureArray(user.habilidadesTecnicas);

      const matchArea = filters.area === '' || 
        (user.area && user.area.toLowerCase().includes(filters.area.toLowerCase())) ||
        (user.cargo && user.cargo.toLowerCase().includes(filters.area.toLowerCase()));
      const matchLocation = filters.location === '' || 
        (user.localizacao && user.localizacao.toLowerCase().includes(filters.location.toLowerCase()));
      const matchTech = filters.tech === '' || 
        (habilidades.some(tech => tech.toLowerCase().includes(filters.tech.toLowerCase())));

      return matchArea && matchLocation && matchTech;
    });
  }, [users, filters]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors pt-6 pb-12 px-4 sm:px-0">
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Talentos WorkQueue</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="area" value={filters.area} onChange={handleFilterChange} placeholder="Área ou Cargo" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="text" name="location" value={filters.location} onChange={handleFilterChange} placeholder="Cidade ou Estado" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="text" name="tech" value={filters.tech} onChange={handleFilterChange} placeholder="Tecnologia" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => {
                const skillsSafe = ensureArray(user.habilidadesTecnicas);
                
                return (
                  <div key={user.id} onClick={() => setSelectedUser(user)} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <img src={user.foto || fotohomem} alt={user.nome} className="w-24 h-24 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600">{user.nome}</h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{user.cargo}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{user.localizacao}</p>
                      
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {skillsSafe.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">{tech}</span>
                        ))}
                        {skillsSafe.length > 3 && <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md">+{skillsSafe.length - 3}</span>}
                      </div>
                      
                      <button className="w-full py-2 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">Ver Perfil Completo</button>
                    </div>
                  </div>
                );
            })}
          </div>
        )}
      </div>
      {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
      <ChatFlutuante />
    </div>
  );
}