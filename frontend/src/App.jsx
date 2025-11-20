import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Sobre from "./pages/Sobre";
import FaleConosco from "./pages/FaleConosco";
import PerfilUser from "./pages/PerfilUser";
import PerfilEmpresa from "./pages/PerfilEmpresa";
import VisaoGeral from "./pages/VisaoGeral";
import Feed from "./pages/Feed";
import Lobby from "./pages/Lobby";
import EscolherTipo from "./pages/EscolherTipo";
import CadastroUserForm from "./pages/CadastroUserForm";
import CadastroEmpresaForm from "./pages/CadastroEmpresaForm";
import RecuperarConta from "./pages/RecuperarConta";
import CadastroConcluido from "./pages/CadastroConcluido";
import CadastroConcluidoEmpresa from "./pages/CadastroConcluidoEmpresa";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        
            <Route path= "/" element={<HomePage />} />
            <Route path= "/sobre" element={<Sobre />} />
            <Route path= "/faleconosco" element={<FaleConosco />} />
            <Route path= "/perfiluser" element={<PerfilUser />} />
            <Route path= "/perfilempresa" element={<PerfilEmpresa />}></Route>
            <Route path="/lobby" element={<Lobby />}></Route>
            <Route path="/admin" element={<VisaoGeral />}></Route>
            <Route path="/feed" element={<Feed />}></Route>
            <Route path="/escolher-tipo" element={<EscolherTipo />}></Route>
            <Route path="/cadastro-user" element={<CadastroUserForm />}></Route>
            <Route path="/cadastro-empresa" element={<CadastroEmpresaForm />}></Route>
            <Route path="/recuperar-conta" element={<RecuperarConta />}></Route>
            <Route path="/cadastro-concluido" element={<CadastroConcluido />}></Route>
            <Route path="/cadastro-concluido-empresa" element={<CadastroConcluidoEmpresa />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>

            
            
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
