import { useState, useEffect } from 'react';
import ChatFlutuante from '../components/ChatFlutuante';
import PainelLoginAdmin from '../components/PainelLoginAdmin';
import UserListModal from '../components/UserListAdminModal';
import EmpresaListAdminModal from '../components/EmpresaListAdminModal'; // <--- Importação nova

export default function VisaoGeral() {

  const [usuariosAtivos, setUsuariosAtivos] = useState(0);
  const [empresasAtivas, setEmpresasAtivas] = useState(0);
  const [vagasAtivas, setVagasAtivas] = useState(0);

  const [estaLogado, setEstaLogado] = useState(false);
  const [statusGemini, setStatusGemini] = useState("Verificando...");
  
  // Estados para Usuários
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  // Estados para Empresas (Novo)
  const [isEmpresaModalOpen, setIsEmpresaModalOpen] = useState(false);
  const [listaEmpresas, setListaEmpresas] = useState([]);

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
    // Busca contagem inicial de usuários para o dashboard
    fetch("http://127.0.0.1:3000/useradmin", {
      headers: {
        "admin_code": localStorage.getItem("codigo")
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if(data) setUsuariosAtivos(data.length);
      })
      .catch((err) => console.error(err));
      
      // Busca contagem inicial de empresas para o dashboard
      fetch("http://127.0.0.1:3000/empresaadmin", { // Ajuste a rota se criou uma especifica /empresaadmin
        headers: { "admin_code": localStorage.getItem("codigo") }
      })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if(data) setEmpresasAtivas(data.length);
      })
      .catch((err) => console.error(err));

    setEstaLogado(true);
  };

  // --- LÓGICA DE USUÁRIOS ---
  const handleGerenciarUsuarios = () => {
    fetch("http://127.0.0.1:3000/useradmin", {
      headers: {
        "admin_code": localStorage.getItem("codigo")
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setListaUsuarios(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários:", err);
      });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (idToDelete) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      setListaUsuarios((prevUsers) => prevUsers.filter(user => user.id !== idToDelete));
      fetch("http://127.0.0.1:3000/useradmin/" + idToDelete, {
        method: "DELETE",
        headers: {
          "admin_code": localStorage.getItem("codigo")
        }
      });
    }
  };

  // --- LÓGICA DE EMPRESAS (NOVO) ---
  const handleGerenciarEmpresas = () => {
    // Usando a rota /empresa que criamos anteriormente.
    // Se você criar uma rota especifica de admin, mude para /empresaadmin
    fetch("http://127.0.0.1:3000/empresaadmin", {
      headers: {
        "admin_code": localStorage.getItem("codigo"),
        // Se sua API exigir token Bearer em vez de admin_code para essa rota, adicione aqui
        // "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Falha ao buscar empresas");
      })
      .then((data) => {
        setListaEmpresas(data);
        setIsEmpresaModalOpen(true); // Abre o modal após carregar
      })
      .catch((err) => {
        console.error("Erro ao buscar empresas:", err);
        alert("Erro ao carregar empresas. Verifique as permissões ou o console.");
      });
  };

  const handleDeleteEmpresa = (idToDelete) => {
    if (window.confirm("Tem certeza que deseja remover esta empresa?")) {
      // Atualiza a UI instantaneamente (Otimista)
      setListaEmpresas((prevEmpresas) => prevEmpresas.filter(empresa => empresa.id !== idToDelete));
      setEmpresasAtivas((prev) => prev - 1); // Atualiza o contador do dashboard

      fetch("http://127.0.0.1:3000/empresaadmin/" + idToDelete, {
        method: "DELETE",
        headers: {
          "admin_code": localStorage.getItem("codigo")
        }
      }).catch(err => {
          console.error("Erro ao deletar:", err);
          alert("Erro ao deletar no servidor.");
      });
    }
  };

  // Placeholder para Vagas
  const handleGerenciarVagas = () => console.log("Gerenciar Vagas (Ainda não implementado)");

  // ---------------------------------------------------------
  // RENDERIZAÇÃO CONDICIONAL (Login)
  // ---------------------------------------------------------
  if (!estaLogado) {
    return <PainelLoginAdmin aoLogar={liberarAcesso} />;
  }

  // ---------------------------------------------------------
  // RENDERIZAÇÃO DA DASHBOARD
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-800 h-32"></div>

      <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg relative -mt-16 mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Visão Geral do Sistema
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Geral */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Geral</h2>
            <div className="space-y-2 text-sm text-gray-700 mb-8">
              <p className="flex items-center">
                <span className="text-blue-600 mr-2">👥</span>
                <span className="font-semibold">Usuários ativos:</span>{" "}
                {usuariosAtivos.toLocaleString()}
              </p>
              <p className="flex items-center">
                <span className="text-gray-600 mr-2">🏢</span>
                <span className="font-semibold">Empresas cadastradas:</span>{" "}
                {empresasAtivas.toLocaleString()}
              </p>
              <p className="flex items-center">
                <span className="text-green-600 mr-2">💼</span>
                <span className="font-semibold">Vagas ativas:</span>{" "}
                {vagasAtivas.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Coluna 2: Botões de Gerenciamento */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Gerenciar Usuários Profissionais
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Gerencie a lista de profissionais cadastrados na plataforma.
              </p>

              {/* Botão que abre o Modal de Usuários */}
              <button
                onClick={handleGerenciarUsuarios}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
              >
                Gerenciar Usuários
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Controle de Vagas Ativas
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Visualize e modere as vagas publicadas recentemente.
              </p>
              <button
                onClick={handleGerenciarVagas}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
              >
                Gerenciar Vagas
              </button>
            </div>
          </div>

          {/* Coluna 3: Empresas e IA */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Gerenciar Empresas Parceiras
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Administre os cadastros corporativos e permissões.
              </p>
              {/* Botão Atualizado para abrir Modal de Empresas */}
              <button
                onClick={handleGerenciarEmpresas}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
              >
                Gerenciar Empresas
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Status da integração com IA
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center">
                  <span className="text-green-500 mr-2">🤖</span>
                  <span className="font-semibold">Conexão:</span> {statusGemini}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DE USUÁRIOS --- */}
      <UserListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={listaUsuarios}
        onDelete={handleDeleteUser}
      />

      {/* --- MODAL DE EMPRESAS (NOVO) --- */}
      <EmpresaListAdminModal
        isOpen={isEmpresaModalOpen}
        onClose={() => setIsEmpresaModalOpen(false)}
        empresas={listaEmpresas}
        onDelete={handleDeleteEmpresa}
      />

      <ChatFlutuante />
    </div>
  );
}