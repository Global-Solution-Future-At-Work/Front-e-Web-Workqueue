import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Briefcase, Zap, Award, ChevronDown, Check, Pencil, X } from 'lucide-react';
import ChatFlutuante from '../components/ChatFlutuante';
import fotohomem from '../assets/fotohomem.svg'; 

const PerfilUser = () => {
  const [open, setOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const [userData, setUserData] = useState(null); 
  const [rawData, setRawData] = useState(null); 
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    localizacao: '',
    resumo: '',
    habilidadesTecnicas: '', 
    softSkills: '',          
    idiomas: ''              
  });

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const authResponse = await fetch('http://localhost:3000/datajwt', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const authData = await authResponse.json();
      const myId = authData.jwt_data.id;

      const userResponse = await fetch('http://localhost:3000/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!userResponse.ok) throw new Error('Erro ao buscar usuários');
      
      const usersList = await userResponse.json();
      
      const currentUser = usersList.find(user => user.id === myId);

      if (!currentUser) {
        console.error("Usuário não encontrado na lista");
        return;
      }

      setRawData(currentUser);

      const formatList = (list) => Array.isArray(list) ? list.map(item => `[ ${item} ]`).join(' ') : list;
      const formatSoft = (list) => Array.isArray(list) ? list.join(' • ') : list;
      
      const experienciasFormatadas = Array.isArray(currentUser.experiencias) 
        ? currentUser.experiencias.map(exp => ({
            titulo: exp.empresa ? `${exp.empresa} — ${exp.cargo || 'Cargo não inf.'} (${exp.inicio || '?'} - ${exp.fim || 'Atual'})` : "Experiência genérica",
            descricao: exp.descricao || "Sem descrição."
          }))
        : typeof currentUser.experiencias === 'string' 
            ? [{ titulo: "Experiência", descricao: currentUser.experiencias }] 
            : [];

      const formacaoFormatada = Array.isArray(currentUser.formacao)
        ? currentUser.formacao.map(form => ({
            descricao: `🎓 ${form.curso} — ${form.instituicao} (${form.ano})`
          }))
        : [];

      let idiomasFormatados = "Não informado";
      if (Array.isArray(currentUser.idiomas)) {
        idiomasFormatados = currentUser.idiomas.map(i => typeof i === 'object' ? `📘 ${i.idioma} (${i.nivel})` : i).join(', ');
      }

      setUserData({
        nome: currentUser.nome,
        localizacao: currentUser.localizacao || "Localização não informada",
        cargo: currentUser.cargo || "Cargo não informado",
        instituicao: currentUser.experiencias?.[0]?.empresa || "Disponível para oportunidades", 
        sobre: currentUser.resumo || "Olá! Sou um profissional apaixonado por tecnologia.",
        habilidade: formatList(currentUser.habilidadesTecnicas),
        soft: `Soft Skills: ${formatSoft(currentUser.softSkills)}`,
        // insights removido daqui
        formacao: formacaoFormatada,
        idiomas: idiomasFormatados,
        experiencias: experienciasFormatadas,
        isOwner: true 
      });

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleOpenModal = () => {
    if (rawData) {
      const habTec = Array.isArray(rawData.habilidadesTecnicas) ? rawData.habilidadesTecnicas.join(', ') : '';
      const softSk = Array.isArray(rawData.softSkills) ? rawData.softSkills.join(', ') : '';

      setFormData({
        nome: rawData.nome || '',
        cargo: rawData.cargo || '',
        localizacao: rawData.localizacao || '',
        resumo: rawData.resumo || '',
        habilidadesTecnicas: habTec,
        softSkills: softSk,
        idiomas: '' 
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
    
    if (!rawData || !rawData.id) return;

    try {
      const habilidadesArray = formData.habilidadesTecnicas.split(',').map(s => s.trim()).filter(s => s !== '');
      const softSkillsArray = formData.softSkills.split(',').map(s => s.trim()).filter(s => s !== '');
      
      const payload = {
        ...rawData, 
        nome: formData.nome,
        cargo: formData.cargo,
        localizacao: formData.localizacao,
        resumo: formData.resumo,
        habilidadesTecnicas: habilidadesArray,
        softSkills: softSkillsArray,
      };

      const response = await fetch(`http://localhost:3000/user/${rawData.id}`, {
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
        alert("Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro no update:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#0F172A]">Carregando...</div>;
  if (!userData) return <div className="min-h-screen flex justify-center items-center text-red-500 bg-gray-100 dark:bg-[#0F172A]">Erro ao carregar dados.</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] py-8 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">

        {/* LADO ESQUERDO */}
        <div className="lg:w-3/4 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition">

            {/* BANNER E FOTO */}
            <div className="bg-blue-600 h-32 rounded-t-lg relative">
              <div className="absolute left-8 top-16">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 bg-gray-300 dark:bg-gray-600 overflow-hidden shadow-md">
                  <img src={fotohomem} alt={userData.nome} className="w-full h-full object-cover" />
                </div>
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
                  <li className="mt-2 font-medium">{userData.idiomas}</li>
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
                        <p className="font-semibold text-gray-900 dark:text-white">{exp.titulo}</p>
                        <p className="ml-0 sm:ml-5 text-sm mt-1 text-gray-600 dark:text-gray-400">{exp.descricao}</p>
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
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Habilidades Técnicas
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.habilidade || "Nenhuma habilidade listada."}
                  </p>

                  {/* Seção de Insights removida daqui */}

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Soft Skills e Hobbies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {userData.soft || "Nenhuma soft skill listada."}
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

              </div>

            </div>
          </div>
        </div>
        
      </div>

      {/* --- MODAL DE EDIÇÃO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
            
            {/* Cabeçalho do Modal */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <Pencil size={20} className="mr-2 text-blue-600" />
                Editar Perfil Pessoal
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habilidades Técnicas (Separe por vírgula)</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Soft Skills (Separe por vírgula)</label>
                <input 
                  type="text" 
                  name="softSkills"
                  value={formData.softSkills}
                  onChange={handleInputChange}
                  placeholder="Ex: Liderança, Comunicação"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Footer do Modal */}
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