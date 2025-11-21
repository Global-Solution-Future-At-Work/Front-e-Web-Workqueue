import React, { useState, useEffect } from 'react'; // Adicionei React aqui por garantia
import ChatFlutuante from '../components/ChatFlutuante';
import PainelLoginAdmin from '../components/PainelLoginAdmin';
import UserListModal from '../components/UserListAdminModal';
import EmpresaListAdminModal from '../components/EmpresaListAdminModal'; 
import VagasListAdminModal from '../components/VagasListAdminModal'; 

export default function VisaoGeral() {

  const [usuariosAtivos, setUsuariosAtivos] = useState(0);
  const [empresasAtivas, setEmpresasAtivas] = useState(0);
  const [vagasAtivas, setVagasAtivas] = useState(0);

  const [estaLogado, setEstaLogado] = useState(false);
  const [statusGemini, setStatusGemini] = useState("Verificando...");
  
  // States para Usuários
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  // States para Empresas
  const [isEmpresaModalOpen, setIsEmpresaModalOpen] = useState(false);
  const [listaEmpresas, setListaEmpresas] = useState([]);

  // States para Vagas
  const [showVagasModal, setShowVagasModal] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/admin/gemini_status")
      .then((res) => res.text())
      .then((data) => {
        setStatusGemini(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar status:", err);
        setStatusGemini("Erro de conexão");
      });
  }, []);

  const liberarAcesso = () => {
    fetch("http://127.0.0.1:3000/useradmin", {
      headers: { "admin_code": localStorage.getItem("codigo") }
    })
      .then((res) => { if (res.ok) return res.json(); })
      .then((data) => { if(data) setUsuariosAtivos(data.length); })
      .catch((err) => console.error(err));
      
      fetch("http://127.0.0.1:3000/empresaadmin", { 
        headers: { "admin_code": localStorage.getItem("codigo") }
      })
      .then((res) => { if (res.ok) return res.json(); })
      .then((data) => { if(data) setEmpresasAtivas(data.length); })
      .catch((err) => console.error(err));

      fetch("http://127.0.0.1:3000/api/vagas") // Use a rota que criamos
      .then((res) => { if (res.ok) return res.json(); })
      .then((data) => { if(data) setVagasAtivas(data.length); })
      .catch((err) => console.error(err));

    setEstaLogado(true);
  };

  // LÓGICA DE USUÁRIOS
  const handleGerenciarUsuarios = () => {
    fetch("http://127.0.0.1:3000/useradmin", {
      headers: { "admin_code": localStorage.getItem("codigo") }
    })
      .then((res) => { if (res.ok) return res.json(); })
      .then((data) => { setListaUsuarios(data); })
      .catch((err) => { console.error("Erro:", err); });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (idToDelete) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      setListaUsuarios((prevUsers) => prevUsers.filter(user => user.id !== idToDelete));
      fetch("http://127.0.0.1:3000/useradmin/" + idToDelete, {
        method: "DELETE",
        headers: { "admin_code": localStorage.getItem("codigo") }
      });
    }
  };

  // LÓGICA DE EMPRESAS
  const handleGerenciarEmpresas = () => {
    fetch("http://127.0.0.1:3000/empresaadmin", {
      headers: { "admin_code": localStorage.getItem("codigo") }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Falha ao buscar empresas");
      })
      .then((data) => {
        setListaEmpresas(data);
        setIsEmpresaModalOpen(true);
      })
      .catch((err) => {
        console.error("Erro:", err);
        alert("Erro ao carregar empresas.");
      });
  };

  const handleDeleteEmpresa = (idToDelete) => {
    if (window.confirm("Tem certeza que deseja remover esta empresa?")) {
      setListaEmpresas((prevEmpresas) => prevEmpresas.filter(empresa => empresa.id !== idToDelete));
      setEmpresasAtivas((prev) => prev - 1);

      fetch("http://127.0.0.1:3000/empresaadmin/" + idToDelete, {
        method: "DELETE",
        headers: { "admin_code": localStorage.getItem("codigo") }
      }).catch(err => {
          console.error("Erro ao deletar:", err);
          alert("Erro ao deletar no servidor.");
      });
    }
  };

  // LÓGICA DE VAGAS
  const handleGerenciarVagas = () => {
    setShowVagasModal(true);
  };

  // RENDERIZAÇÃO CONDICIONAL (Login)
  if (!estaLogado) {
    return <PainelLoginAdmin aoLogar={liberarAcesso} />;
  }

  // RENDERIZAÇÃO DA DASHBOARD
  return (

    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors">
      <div className="bg-blue-800 dark:bg-blue-900 h-32"></div>

      <div className="
        max-w-6xl mx-auto p-8 
        bg-white dark:bg-[#1E293B]
        shadow-xl rounded-lg 
        relative -mt-16 mb-12
        transition-colors
      ">        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b dark:border-gray-600 pb-4">
          Visão Geral do Sistema
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Geral</h2>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-8">
              <p className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">👥</span>
                <span className="font-semibold">Usuários ativos:</span>{" "}
                {usuariosAtivos.toLocaleString()}
              </p>

              <p className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300 mr-2">🏢</span>
                <span className="font-semibold">Empresas cadastradas:</span>{" "}
                {empresasAtivas.toLocaleString()}
              </p>

              <p className="flex items-center">
                <span className="text-green-600 dark:text-green-400 mr-2">💼</span>
                <span className="font-semibold">Vagas ativas:</span>{" "}
                {vagasAtivas.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Botões de Gerenciamento */}
          <div className="space-y-8">
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Gerenciar Usuários Profissionais
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Gerencie a lista de profissionais cadastrados na plataforma.

              </p>
              <button
                onClick={handleGerenciarUsuarios}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-150 font-medium"
              >
                Gerenciar Usuários
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Controle de Vagas Ativas
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Visualize e modere as vagas publicadas recentemente.
              </p>
              <button
                onClick={handleGerenciarVagas}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-150 font-medium"
              >
                Gerenciar Vagas
              </button>
            </div>

          </div>

          <div className="space-y-8">

            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Gerenciar Empresas Parceiras
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                (Ao abrir esse perfil, abrir uma tabela com a lista das empresas)
              </p>
              <button
                onClick={handleGerenciarEmpresas}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-150 font-medium"
              >
                Gerenciar Empresas
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Status da integração com IA
              </h2>

              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">

                <p className="flex items-center">
                  <span className="text-green-500 mr-2">🤖</span>
                  <span className="font-semibold">Conexão:</span> {statusGemini}
                </p>


              </div>

            </div>

          </div>
        </div>
      </div>

      {/* MODAL DE USUÁRIOS */}
      <UserListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={listaUsuarios}
        onDelete={handleDeleteUser}
      />

      {/* MODAL DE EMPRESAS */}
      <EmpresaListAdminModal
        isOpen={isEmpresaModalOpen}
        onClose={() => setIsEmpresaModalOpen(false)}
        empresas={listaEmpresas}
        onDelete={handleDeleteEmpresa}
      />

      {/* MODAL DE VAGAS */}
      {showVagasModal && (
        <VagasListAdminModal onClose={() => setShowVagasModal(false)} />
      )}

      <ChatFlutuante />

    </div>
  );
}
