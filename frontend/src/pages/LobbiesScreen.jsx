import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Plus, 
  Search, 
  ArrowRight,
  Building2,
  X,
  MapPin
} from 'lucide-react';

// ... (CreateLobbyModal e LobbyCard permanecem iguais ao anterior)
// Vou repetir apenas o componente principal com a lógica de autenticação alterada

// --- Modal de Criação (Mantido igual) ---
const CreateLobbyModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    localizacao: '',
    requisitos: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onCreate(formData);
    setLoading(false);
    setFormData({ nome: '', descricao: '', localizacao: '', requisitos: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Novo Lobby
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Crie uma nova sala de recrutamento</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Vaga / Lobby</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ex: Desenvolvedor Full Stack Senior"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Localização</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ex: Remoto, São Paulo"
              value={formData.localizacao}
              onChange={e => setFormData({...formData, localizacao: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
            <textarea 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32 resize-none"
              value={formData.descricao}
              onChange={e => setFormData({...formData, descricao: e.target.value})}
            />
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">Cancelar</button>
          <button onClick={handleSubmit} disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 flex items-center gap-2">
            {loading ? 'Criando...' : <><Plus className="w-4 h-4" /> Criar Lobby</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Card do Lobby (Mantido igual) ---
const LobbyCard = ({ lobby, onClick }) => {
  const candidateCount = Array.isArray(lobby.candidatos) ? lobby.candidatos.length : 0;

  return (
    <div 
      onClick={() => onClick(lobby.id)}
      className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Briefcase className="w-24 h-24 text-blue-600" />
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 p-3 rounded-lg">
            <Briefcase className="w-6 h-6" />
          </div>
          {lobby.isNew && (
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Novo</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
          {lobby.nome || "Lobby sem nome"}
        </h3>
        {lobby.localizacao && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            {lobby.localizacao}
          </div>
        )}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 h-10">
          {lobby.descricao || "Sem descrição disponível."}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
            <Users className="w-4 h-4" />
            <span>{candidateCount} {candidateCount === 1 ? 'Candidato' : 'Candidatos'}</span>
          </div>
          <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
            Ver detalhes <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tela Principal com Autenticação ---
export default function LobbiesScreen() {
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dados Mock para fallback
  const fallbackData = [
    {
      id: "mock_1",
      nome: "Vaga Exemplo (Offline)",
      descricao: "Dados locais exibidos pois o servidor não respondeu.",
      localizacao: "Localhost",
      candidatos: [], 
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    const initData = async () => {
      try {
        // --- 1. Autenticação: Pegar token e verificar Role ---
        const token = localStorage.getItem('token'); // Recupera o JWT salvo
        
        if (token) {
          try {
            const authResponse = await fetch('http://127.0.0.1:3000/datajwt', {
              method: 'GET',
              headers: { 
                'Authorization': `Bearer ${token}`, // Envia o token no header
                'Content-Type': 'application/json'
              }
            });

            if (authResponse.ok) {
              const jwtData = await authResponse.json();
              // Verifica a role dentro do objeto retornado pelo controller
              // Ajuste 'jwtData.role' ou 'jwtData.datajwt.role' conforme seu backend responde exatamento
              if (jwtData?.role === 'empresa' || jwtData?.datajwt?.role === 'empresa') {
                setIsCompany(true);
              }
            } else {
              console.warn("Token inválido ou expirado");
              // Opcional: localStorage.removeItem('token');
            }
          } catch (err) {
            console.warn("Erro ao validar token:", err);
          }
        }

        // --- 2. Buscar Lobbies ---
        const lobbiesResponse = await fetch('http://127.0.0.1:3000/lobbies');
        if (lobbiesResponse.ok) {
          const data = await lobbiesResponse.json();
          setLobbies(Array.isArray(data) ? data : fallbackData);
        } else {
          setLobbies(fallbackData);
        }

      } catch (error) {
        console.error("Erro geral:", error);
        setLobbies(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const handleCreateLobby = async (newLobbyData) => {
    // UI Otimista
    const tempId = `temp_${Date.now()}`;
    const optimisicLobby = {
      id: tempId,
      ...newLobbyData,
      candidatos: [],
      createdAt: new Date().toISOString(),
      isNew: true
    };
    
    setLobbies(prev => [optimisicLobby, ...prev]);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://127.0.0.1:3000/lobbies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // É boa prática enviar o token ao criar dados também
          'Authorization': token ? `Bearer ${token}` : '' 
        },
        body: JSON.stringify(newLobbyData)
      });

      if (response.ok) {
        const savedLobby = await response.json();
        setLobbies(prev => prev.map(l => l.id === tempId ? { ...savedLobby, isNew: true } : l));
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const filteredLobbies = lobbies.filter(lobby => 
    (lobby.nome && lobby.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lobby.descricao && lobby.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Lobbies & Vagas
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                  {lobbies.length}
                </span>
              </h1>
            </div>

            {isCompany && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Criar Novo Lobby
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome da vaga..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isCompany && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium"
            >
              <Plus className="w-5 h-5" />
              Criar Lobby
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredLobbies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLobbies.map((lobby) => (
              <LobbyCard 
                key={lobby.id} 
                lobby={lobby} 
                onClick={(id) => navigate(`/lobby/${id}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhum lobby encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Tente ajustar sua busca.</p>
          </div>
        )}
      </main>

      <CreateLobbyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateLobby}
      />
    </div>
  );
}