import { Routes, Route } from "react-router-dom";

// Componentes Globais
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Páginas Públicas
import HomePage from "./pages/HomePage";
import Sobre from "./pages/Sobre";
import FaleConosco from "./pages/FaleConosco";
import Login from "./pages/Login";
import EscolherTipo from "./pages/EscolherTipo";
import CadastroUserForm from "./pages/CadastroUserForm";
import CadastroEmpresaForm from "./pages/CadastroEmpresaForm";
import RecuperarConta from "./pages/RecuperarConta";
import CadastroConcluido from "./pages/CadastroConcluido";
import CadastroConcluidoEmpresa from "./pages/CadastroConcluidoEmpresa";
import NotFound from "./pages/NotFound";

// Páginas Privadas (Requerem Token)
import PerfilUser from "./pages/PerfilUser";
import PerfilEmpresa from "./pages/PerfilEmpresa";
import VisaoGeral from "./pages/VisaoGeral";
import Feed from "./pages/Feed";
import Lobby from "./pages/Lobby";
import PeopleGrid from "./pages/PeopleGrid";
import EmpresaGrid from "./pages/EmpresaGrid";
import LobbiesScreen from "./pages/LobbiesScreen";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="grow">
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-conta" element={<RecuperarConta />} />
          <Route path="/admin" element={<VisaoGeral />} />
          
          <Route path="/escolher-tipo" element={<EscolherTipo />} />
          <Route path="/cadastro-user" element={<CadastroUserForm />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresaForm />} />
          <Route path="/cadastro-concluido" element={<CadastroConcluido />} />
          <Route path="/cadastro-concluido-empresa" element={<CadastroConcluidoEmpresa />} />
          <Route element={<PrivateRoute />}>
            <Route path="/perfiluser" element={<PerfilUser />} />
            <Route path="/perfilempresa" element={<PerfilEmpresa />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/pessoas" element={<PeopleGrid/>} />
            <Route path="/empresas" element={<EmpresaGrid/>} />
            <Route path="lobbies-rooms" element={<LobbiesScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;