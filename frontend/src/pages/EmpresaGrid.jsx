import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultLogo from "../assets/fotohomem.svg"; 
import ChatFlutuante from '../components/ChatFlutuante';

const BuildingIcon = () => (
  <div className="w-24 h-24 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 text-blue-500 dark:text-blue-400">
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  </div>
);

// Componente Modal de Detalhes da Empresa
const EmpresaModal = ({ empresa, onClose }) => {
  if (!empresa) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        
        {/* Header do Modal */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Perfil Corporativo</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Cabeçalho da Empresa */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {empresa.foto ? (
               <img 
               src={empresa.foto} 
               alt={empresa.nome_empresa} 
               className="w-32 h-32 rounded-xl object-cover border-4 border-gray-100 dark:border-gray-700 shadow-sm"
             />
            ) : (
              <BuildingIcon />
            )}
           
            <div className="text-center sm:text-left grow">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{empresa.nome_empresa}</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {empresa.area_atuacao}
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{empresa.localizacao || "Localização não informada"}</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <span>Porte: {empresa.tamanho}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sobre e Descrição */}
          <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg">Sobre a Empresa</h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {empresa.descricao || "Nenhuma descrição fornecida."}
            </p>
          </div>

          {/* Contato e Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Contato
                </h4>
                <a href={`mailto:${empresa.email_corporativo}`} className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                    {empresa.email_corporativo}
                </a>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    Website
                </h4>
                {empresa.site ? (
                    <a href={empresa.site.startsWith('http') ? empresa.site : `https://${empresa.site}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate block">
                        {empresa.site}
                    </a>
                ) : (
                    <span className="text-gray-400 dark:text-gray-500">Não informado</span>
                )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Componente Principal da Página
export default function EmpresaGrid() {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  // State para filtros
  const [filters, setFilters] = useState({
    area: '',
    location: '',
    tamanho: '' // Substitui 'tech' por 'tamanho'
  });

  // Atualiza o state dos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://127.0.0.1:3000/empresa', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setEmpresas(Array.isArray(data) ? data : [data]); 
        } else {
          console.error("Erro ao buscar empresas");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  // Filtro
  const filteredEmpresas = useMemo(() => {
    return empresas.filter(empresa => {
      // Área de Atuação
      const matchArea = filters.area === '' || 
        (empresa.area_atuacao && empresa.area_atuacao.toLowerCase().includes(filters.area.toLowerCase()));

      // Localização
      const matchLocation = filters.location === '' || 
        (empresa.localizacao && empresa.localizacao.toLowerCase().includes(filters.location.toLowerCase()));

      // Tamanho
      const matchTamanho = filters.tamanho === '' || 
        (empresa.tamanho && empresa.tamanho.toLowerCase().includes(filters.tamanho.toLowerCase()));

      return matchArea && matchLocation && matchTamanho;
    });
  }, [empresas, filters]);

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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Empresas Parceiras</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* BARRA DE FILTROS */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Buscar Empresas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Filtro por Área */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <input
                type="text"
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
                placeholder="Área de Atuação (ex: Fintech)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro por Localização */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Localização (ex: São Paulo)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtro por Tamanho */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <input
                type="text"
                name="tamanho"
                value={filters.tamanho}
                onChange={handleFilterChange}
                placeholder="Porte (ex: Grande, Startup)"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Carregando empresas...</p>
          </div>
        ) : (
          <>
            {filteredEmpresas.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                 <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhuma empresa encontrada</h3>
                 <p className="text-gray-500 dark:text-gray-400">Tente ajustar seus filtros de busca.</p>
                 <button 
                    onClick={() => setFilters({area: '', location: '', tamanho: ''})}
                    className="mt-4 text-blue-600 hover:underline"
                 >
                    Limpar filtros
                 </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Lista filtrada */}
                {filteredEmpresas.map((empresa) => (
                  <div 
                    key={empresa.id}
                    onClick={() => setSelectedEmpresa(empresa)}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group flex flex-col h-full"
                  >
                    <div className="flex flex-col items-center text-center grow">
                      <div className="mb-4">
                         {empresa.foto ? (
                            <img 
                                src={empresa.foto} 
                                alt={empresa.nome_empresa} 
                                className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 dark:border-gray-700 shadow-sm"
                            />
                         ) : (
                            // Versão mini do ícone
                            <div className="w-20 h-20 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                         )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {empresa.nome_empresa}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{empresa.area_atuacao}</p>
                      
                      <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 mb-4 w-full">
                        <div className="flex items-center justify-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="truncate max-w-[200px]">{empresa.localizacao || "Remoto / N/A"}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <span>{empresa.tamanho}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-auto py-2 px-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-colors duration-200 text-sm">
                        Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {selectedEmpresa && (
        <EmpresaModal 
          empresa={selectedEmpresa} 
          onClose={() => setSelectedEmpresa(null)} 
        />
      )}
      <ChatFlutuante />
    </div>
  );
}