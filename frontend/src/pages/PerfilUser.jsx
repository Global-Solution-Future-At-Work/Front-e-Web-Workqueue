import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Briefcase, Zap, Award, ChevronDown, Check, Pencil, X, 
  Trash2, MessageSquare, Image as ImageIcon
} from 'lucide-react';
import ChatFlutuante from '../components/ChatFlutuante';
import fotohomem from '../assets/fotohomem.svg'; 

// --- FUNÇÕES AUXILIARES (Normalização de Dados) ---
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
    return [{ 
      cargo: data, 
      empresa: "Empresa não inf.", 
      inicio: "", 
      fim: "", 
      descricao: "" 
    }];
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

const PerfilUser = () => {
  const [open, setOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const [userData, setUserData] = useState(null); 
  const [rawData, setRawData] = useState(null); 
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado do formulário de edição
  const [formData, setFormData] = useState({
    nome: '',
    foto: '', // Novo campo para URL da foto
    cargo: '',
    area: '',
    localizacao: '',
    resumo: '',
    habilidadesTecnicas: '', 
    softSkills: '',          
    idiomas: '',
    certificacoes: '',
    areaInteresses: ''
  });

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const authResponse = await fetch('http://127.0.0.1:3000/datajwt', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!authResponse.ok) throw new Error('Falha na autenticação');

      const authData = await authResponse.json();
      const myId = authData.jwt_data.id; 

      const userResponse = await fetch('http://127.0.0.1:3000/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!userResponse.ok) throw new Error('Erro ao buscar usuários');

      const usersList = await userResponse.json();
      const currentUser = usersList.find(user => user.id === myId);

      if (!currentUser) throw new Error('Usuário não encontrado');

      setRawData(currentUser);

      try {
         const recResponse = await fetch(`http://127.0.0.1:3000/recomendacao/user/${myId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
         });
         
         if (recResponse.ok) {
            const recData = await recResponse.json();
            setRecommendations(recData);
         }
      } catch (err) {
          console.error("Erro ao buscar recomendações:", err);
      }

      // Normalização dos dados recebidos para o state de visualização
      const experienciasSafe = normalizeExperience(currentUser.experiencias);
      const formacaoSafe = normalizeEducation(currentUser.formacao);
      const habilidadesSafe = ensureArray(currentUser.habilidadesTecnicas);
      const softSafe = ensureArray(currentUser.softSkills);
      const idiomasSafe = ensureArray(currentUser.idiomas);
      const certificacoesSafe = ensureArray(currentUser.certificacoes);
      const interessesSafe = ensureArray(currentUser.areaInteresses);

      // Formatação específica para strings de exibição no card
      const formatList = (list) => list.map(item => typeof item === 'string' ? item : (item.idioma || item)).join(', ');
      const formatSoft = (list) => list.join(' • ');

      setUserData({
        nome: currentUser.nome,
        foto: currentUser.foto, // Captura a foto do banco
        localizacao: currentUser.localizacao || "Localização não informada",
        cargo: currentUser.cargo || "Cargo não informado",
        area: currentUser.area || "",
        instituicao: experienciasSafe[0]?.empresa || "Disponível para oportunidades", 
        sobre: currentUser.resumo || "Sem resumo cadastrado.",
        habilidade: formatList(habilidadesSafe),
        soft: formatSoft(softSafe),
        formacao: formacaoSafe.map(f => ({ descricao: `🎓 ${f.curso} — ${f.instituicao} ${f.ano ? `(${f.ano})` : ''}` })),
        idiomas: idiomasSafe,
        certificacoes: certificacoesSafe,
        areaInteresses: interessesSafe,
        experiencias: experienciasSafe.map(exp => ({
            titulo: exp.empresa ? `${exp.empresa} — ${exp.cargo || 'Cargo não inf.'} (${exp.inicio || '?'} - ${exp.fim || 'Atual'})` : "Experiência",
            descricao: exp.descricao || "Sem descrição."
        })),
        isOwner: true 
      });

    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      if (error.message === 'Falha na autenticação') {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Função para Deletar Recomendação ---
  const handleDeleteRecommendation = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar esta recomendação?")) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://127.0.0.1:3000/recomendacao/${id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            setRecommendations(prev => prev.filter(rec => rec.id !== id));
            alert("Recomendação removida.");
        } else {
            alert("Erro ao remover recomendação.");
        }
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro de conexão.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleOpenModal = () => {
    if (rawData) {
      const habTec = ensureArray(rawData.habilidadesTecnicas).join(', ');
      const softSk = ensureArray(rawData.softSkills).join(', ');
      const certs = ensureArray(rawData.certificacoes).join(', ');
      const interesses = ensureArray(rawData.areaInteresses).join(', ');
      
      const idiomasStr = ensureArray(rawData.idiomas) 
        .map(i => typeof i === 'object' ? `${i.idioma} (${i.nivel})` : i)
        .join(', ');

      setFormData({
        nome: rawData.nome || '',
        foto: rawData.foto || '', 
        cargo: rawData.cargo || '',
        area: rawData.area || '',
        localizacao: rawData.localizacao || '',
        resumo: rawData.resumo || '',
        habilidadesTecnicas: habTec,
        softSkills: softSk,
        idiomas: idiomasStr,
        certificacoes: certs,
        areaInteresses: interesses
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!rawData || !rawData.id) {
        alert("Erro: ID do usuário não encontrado.");
        return;
    }

    try {
      const splitAndTrim = (str) => str ? str.split(',').map(s => s.trim()).filter(s => s !== '') : [];

      const habilidadesArray = splitAndTrim(formData.habilidadesTecnicas);
      const softSkillsArray = splitAndTrim(formData.softSkills);
      const certificacoesArray = splitAndTrim(formData.certificacoes);
      const interessesArray = splitAndTrim(formData.areaInteresses);
      
      const idiomasArray = formData.idiomas ? formData.idiomas.split(',').map(s => {
        const clean = s.trim();
        if (!clean) return null;
        const match = clean.match(/^(.*?)\s*\((.*?)\)$/); 
        if (match) return { idioma: match[1], nivel: match[2] };
        return { idioma: clean, nivel: "Não informado" };
      }).filter(Boolean) : [];
      
      const payload = {
        ...rawData, 
        nome: formData.nome,
        foto: formData.foto, 
        cargo: formData.cargo,
        area: formData.area,
        localizacao: formData.localizacao,
        resumo: formData.resumo,
        habilidadesTecnicas: habilidadesArray,
        softSkills: softSkillsArray,
        idiomas: idiomasArray,
        certificacoes: certificacoesArray,
        areaInteresses: interessesArray
      };

      const response = await fetch(`http://127.0.0.1:3000/user/${rawData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setIsModalOpen(false);
        fetchUserData(); 
      } else {
        alert("Erro ao atualizar perfil. Tente novamente.");
      }

    } catch (error) {
      console.error("Erro no update:", error);
      alert("Erro de conexão ao tentar salvar.");
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#0F172A]">Carregando...</div>;
  
  if (!userData) return (
    <div className="min-h-screen flex flex-col justify-center items-center text-red-500 bg-gray-100 dark:bg-[#0F172A]">
        <p>Erro ao carregar dados.</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-blue-500 underline">Tentar novamente</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] py-8 transition-colors font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">

        <div className="lg:w-3/4 w-full flex flex-col gap-6"> 
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition">

            <div className="bg-blue-600 h-32 rounded-t-lg relative">
              <div className="absolute left-8 top-16">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 bg-gray-300 dark:bg-gray-600 overflow-hidden shadow-md">
                  <img 
                    src={userData.foto || fotohomem} 
                    alt={userData.nome} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = fotohomem; }} 
                  />
                </div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">

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

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="text-gray-700 dark:text-gray-200 text-base">
                      Cargo: <b>{userData.cargo}</b>
                    </p>
                    {userData.area && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                        {userData.area}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                    Instituição/Empresa: {userData.instituicao}
                  </p>
                </div>

                {/* BOTÕES */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button 
                    onClick={handleOpenModal}
                    className="flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full px-4 py-1.5 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                  >
                    <Pencil size={16} className="mr-2" />
                    Editar Perfil
                  </button>
                </div>
              </div>

              {/* SESSÕES */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Sobre mim
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {userData.sobre}
                </p>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Formação e Idiomas
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {userData.formacao.length > 0 ? (
                    userData.formacao.map((item, index) => (
                      <li key={index}>{item.descricao}</li>
                    ))
                  ) : (
                    <li>Nenhuma formação registrada.</li>
                  )}
                  
                  {userData.idiomas && userData.idiomas.length > 0 && (
                    <li className="flex flex-wrap gap-2 mt-3 pt-2">
                      {userData.idiomas.map((item, idx) => {
                          const nome = typeof item === 'string' ? item : item.idioma;
                          const nivel = typeof item === 'string' ? '' : item.nivel;
                          return (
                            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-100 dark:border-green-900">
                                📘 {nome} {nivel && <span className="text-xs opacity-75 ml-1 uppercase">({nivel})</span>}
                            </span>
                          )
                      })}
                    </li>
                  )}
                </ul>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Experiências profissionais
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  {userData.experiencias.length > 0 ? (
                    userData.experiencias.map((exp, index) => (
                      <li key={index}>
                        <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                           <Briefcase size={16} className="text-gray-400" />
                           {exp.titulo}
                        </p>
                        <p className="ml-6 text-sm mt-1 text-gray-600 dark:text-gray-400">{exp.descricao}</p>
                      </li>
                    ))
                  ) : (
                    <li>Nenhuma experiência registrada.</li>
                  )}
                </ul>
              </div>

              {/* SEÇÃO EXPANDIDA */}
              {open && (
                <div className="mb-4 animate-fadeIn">

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-500" /> Habilidades Técnicas
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                      {userData.habilidade ? userData.habilidade.split(', ').map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-lg text-sm">{tech}</span>
                      )) : "Nenhuma listada"}
                  </div>

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Soft Skills
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.soft || "Nenhuma soft skill listada."}
                  </p>

                   {/* Certificações */}
                   {userData.certificacoes && userData.certificacoes.length > 0 && (
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <Award size={20} className="text-orange-500" /> Certificações
                      </h3>
                      <ul className="space-y-1 ml-1">
                        {userData.certificacoes.map((cert, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span> {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                   )}

                   {/* Áreas de Interesse */}
                   {userData.areaInteresses && userData.areaInteresses.length > 0 && (
                    <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                        ❤️ Áreas de Interesse
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {userData.areaInteresses.map((int, i) => (
                          <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 rounded-full text-xs font-semibold uppercase tracking-wide">
                            {int}
                          </span>
                        ))}
                      </div>
                    </div>
                   )}

                </div>
              )}

              {/* BOTÕES FINAL */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setOpen(!open)}
                  className="text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {open ? "Ver menos" : "Ver mais detalhes"}
                  <ChevronDown size={16} className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* --- NOVA SEÇÃO: RECOMENDAÇÕES --- */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition p-8">
             <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-green-600" />
                Recomendações Recebidas
             </h3>

             {recommendations.length === 0 ? (
                 <p className="text-gray-500 dark:text-gray-400 italic">Você ainda não possui recomendações.</p>
             ) : (
                 <div className="grid gap-4">
                     {recommendations.map((rec) => (
                         <div key={rec.id} className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                             {/* Ícone de Citação */}
                             <div className="absolute top-4 left-4 opacity-20">
                                 <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.896 14.321 16.33 15.657 15.33C16.871 14.42 17.059 14.315 17.338 13.68C16.525 13.68 16.164 13.68 15.89 13.68C12.951 13.68 11.464 12.193 11.464 9.253V5H17.964V9.253C17.964 12.407 18.144 13.587 19.705 14.82C20.881 15.75 21.964 15.75 21.964 18C21.964 19.657 20.621 21 18.964 21H14.017ZM6.017 21L6.017 18C6.017 16.896 6.321 16.33 7.657 15.33C8.871 14.42 9.059 14.315 9.338 13.68C8.525 13.68 8.164 13.68 7.89 13.68C4.951 13.68 3.464 12.193 3.464 9.253V5H9.964V9.253C9.964 12.407 10.144 13.587 11.705 14.82C12.881 15.75 13.964 15.75 13.964 18C13.964 19.657 12.621 21 10.964 21H6.017Z" /></svg>
                             </div>
                             
                             <p className="relative z-10 text-gray-700 dark:text-gray-300 italic pt-2 pl-8 pr-8">
                                 "{rec.mensagem}"
                             </p>

                             {/* Botão de Excluir (Só aparece se for o dono) */}
                             {userData.isOwner && (
                                 <button 
                                     onClick={() => handleDeleteRecommendation(rec.id)}
                                     className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                                     title="Excluir recomendação"
                                 >
                                     <Trash2 size={16} />
                                 </button>
                             )}
                         </div>
                     ))}
                 </div>
             )}
          </div>
          {/* --- FIM SEÇÃO RECOMENDAÇÕES --- */}

        </div>
        
      </div>

      {/* --- MODAL DE EDIÇÃO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
            
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <Pencil size={20} className="mr-2 text-blue-600" />
                Editar Perfil Pessoal
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 items-center gap-1">
                  <ImageIcon size={16} /> URL da Foto de Perfil
                </label>
                <input 
                  type="text" 
                  name="foto"
                  value={formData.foto}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/minha-foto.jpg"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">Cole o link direto de uma imagem (png, jpg, webp).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo Atual</label>
                  <input 
                    type="text" 
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    placeholder="Ex: Desenvolvedor Fullstack"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Área de Atuação</label>
                  <input 
                    type="text" 
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="Ex: Desenvolvimento"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Localização</label>
                  <input 
                    type="text" 
                    name="localizacao"
                    value={formData.localizacao}
                    onChange={handleInputChange}
                    placeholder="Ex: São Paulo - SP"
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sobre Mim (Resumo)</label>
                <textarea 
                  name="resumo"
                  value={formData.resumo}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habilidades Técnicas <span className="text-xs text-gray-400 font-normal">(Separe por vírgula)</span></label>
                    <input 
                      type="text" 
                      name="habilidadesTecnicas"
                      value={formData.habilidadesTecnicas}
                      onChange={handleInputChange}
                      placeholder="Ex: Java, Python, React"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Soft Skills <span className="text-xs text-gray-400 font-normal">(Separe por vírgula)</span></label>
                    <input 
                      type="text" 
                      name="softSkills"
                      value={formData.softSkills}
                      onChange={handleInputChange}
                      placeholder="Ex: Liderança, Comunicação"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Idiomas <span className="text-xs text-gray-400 font-normal">(Formato: Idioma (Nivel), Idioma 2 (Nivel))</span>
                    </label>
                    <input 
                      type="text" 
                      name="idiomas"
                      value={formData.idiomas}
                      onChange={handleInputChange}
                      placeholder="Ex: Inglês (Avançado), Espanhol (Básico)"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Certificações <span className="text-xs text-gray-400 font-normal">(Separe por vírgula)</span></label>
                    <input 
                      type="text" 
                      name="certificacoes"
                      value={formData.certificacoes}
                      onChange={handleInputChange}
                      placeholder="Ex: AWS Cloud, Scrum Master"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Áreas de Interesse <span className="text-xs text-gray-400 font-normal">(Separe por vírgula)</span></label>
                    <input 
                      type="text" 
                      name="areaInteresses"
                      value={formData.areaInteresses}
                      onChange={handleInputChange}
                      placeholder="Ex: UI Design, Acessibilidade, IA"
                      className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition shadow-md"
                >
                  Salvar Alterações
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <ChatFlutuante />
    </div>
  );
};

export default PerfilUser;