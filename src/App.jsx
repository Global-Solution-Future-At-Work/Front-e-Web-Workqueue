import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Sobre from "./pages/Sobre";
import FaleConosco from "./pages/FaleConosco";
import PerfilUser from "./pages/PerfilUser";
import PerfilEmpresa from "./pages/PerfilEmpresa";
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

            
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
