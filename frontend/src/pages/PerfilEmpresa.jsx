import React, { useState, useEffect } from 'react';
import { MapPin, Check, Pencil, Plus, Upload, ChevronDown, X } from 'lucide-react';
import ChatFlutuante from '../components/ChatFlutuante';
import { useNavigate } from "react-router-dom";
import fotoempresa from "../assets/fotoempresa.svg";

const PerfilEmpresa = () => {
  const [open, setOpen] = useState(false); // Controle do "Ver mais"
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do Modal
  
  const [empresaData, setEmpresaData] = useState(null); // Dados formatados para exibir
  const [rawData, setRawData] = useState(null); // Dados brutos do banco para edição
  const [loading, setLoading] = useState(true);

  // Estado do Formulário de Edição
  const [formData, setFormData] = useState({
    nome_empresa: '',
    localizacao: '',
    area_atuacao: '',
    tamanho: '',
    descricao: '',
    site: '',
    email_corporativo: ''
  });

  const navigate = useNavigate();

  // Função para buscar os dados
  const fetchEmpresaData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // 1. Pega ID do Token
      const authResponse = await fetch('http://localhost:3000/datajwt', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const authData = await authResponse.json();
      const myId = authData.jwt_data.id;

      // 2. Pega dados da Empresa
      const empresaResponse = await fetch(`http://localhost:3000/empresa/${myId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!empresaResponse.ok) throw new Error('Erro ao buscar empresa');
      
      const data = await empresaResponse.json();

      // Salva os dados brutos para usar no formulário depois
      setRawData(data);

      // Formata os dados para visualização (View)
      setEmpresaData({
        nome: data.nome_empresa,
        localizacao: data.localizacao,
        setor: data.area_atuacao,
        tamanho: data.tamanho,
        sobre: data.descricao || "Sem descrição disponível.",
        conecte: `🌐 Site: ${data.site || 'Não informado'}\n📧 E-mail: ${data.email_corporativo}`,
        vagas: "Nenhuma vaga publicada no momento.",
        lobbies: "Nenhum lobby ativo no momento.",
        isOwner: true 
      });

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresaData();
  }, [navigate]);

  // Abre o modal e preenche os inputs com os dados atuais
  const handleOpenModal = () => {
    if (rawData) {
      setFormData({
        nome_empresa: rawData.nome_empresa || '',
        localizacao: rawData.localizacao || '',
        area_atuacao: rawData.area_atuacao || '',
        tamanho: rawData.tamanho || '',
        descricao: rawData.descricao || '',
        site: rawData.site || '',
        email_corporativo: rawData.email_corporativo || ''
      });
    }
    setIsModalOpen(true);
  };

  // Atualiza o estado do formulário conforme digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Envia a atualização (PUT)
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!rawData || !rawData.id) return;

    try {
      // NOTA: Não enviamos a 'senha'. O controller receberá 'undefined' e o repository manterá a antiga.
      const response = await fetch(`http://localhost:3000/empresa/${rawData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setIsModalOpen(false);
        fetchEmpresaData(); // Recarrega a página com os novos dados
      } else {
        alert("Erro ao atualizar. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro no update:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-500">Carregando...</div>;
  if (!empresaData) return <div className="min-h-screen flex justify-center items-center text-red-500">Erro ao carregar dados.</div>;

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
                  <img src={fotoempresa} alt={empresaData.nome} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* CONTEÚDO */}
            <div className="pt-20 px-8 pb-8">
              
              {/* HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    {empresaData.nome}
                    <Check size={20} className="text-blue-600 bg-blue-100 dark:bg-blue-900 rounded-full p-0.5 ml-2" />
                  </h2>
                  <p className="text-gray-500 dark:text-gray-300 mt-1 flex items-center text-sm">
                    <MapPin size={14} className="mr-1 text-red-500" />
                    {empresaData.localizacao}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mt-2 text-base">
                    Setor: {empresaData.setor}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mt-2 text-base">
                    Tamanho: {empresaData.tamanho}
                  </p>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="flex flex-col gap-3 mt-3">
                  <button 
                    onClick={handleOpenModal}
                    className="flex items-center text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full px-4 py-2 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                  >
                    <Pencil size={16} className="mr-2" />
                    Editar Perfil
                  </button>

                  {empresaData.isOwner && (
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

              {/* SEÇÕES DE TEXTO */}
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Sobre a Empresa</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{empresaData.sobre}</p>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Vagas Abertas</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{empresaData.vagas}</p>
              </div>

              {/* VER MAIS */}
              {open && (
                <div className="mb-4 animate-fadeIn">
                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Lobbies Ativos</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{empresaData.lobbies}</p>
                  <button className="bg-blue-600 text-white rounded-full px-3 py-2 font-semibold text-sm hover:bg-blue-700 transition shadow-sm">
                    Visualizar Lobby
                  </button>

                  <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-6" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Conecte-se conosco</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{empresaData.conecte}</p>
                </div>
              )}

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                <button onClick={() => setOpen(!open)} className="text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition">
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
                Editar Perfil da Empresa
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Empresa</label>
                  <input 
                    type="text" 
                    name="nome_empresa"
                    value={formData.nome_empresa}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Corporativo</label>
                  <input 
                    type="email" 
                    name="email_corporativo"
                    value={formData.email_corporativo}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site</label>
                  <input 
                    type="text" 
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Área de Atuação</label>
                  <input 
                    type="text" 
                    name="area_atuacao"
                    value={formData.area_atuacao}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho</label>
                  <select 
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Pequena">Pequena</option>
                    <option value="Média">Média</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição (Sobre)</label>
                <textarea 
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
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

export default PerfilEmpresa;