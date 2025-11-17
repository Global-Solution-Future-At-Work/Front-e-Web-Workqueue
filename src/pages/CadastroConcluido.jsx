import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function CadastroConcluido() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">

      <img 
        src={logo} 
        alt="WorkQueue Logo"
        className="w-[800px] h-auto"
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Cadastro concluído!
      </h1>

      <p className="text-lg text-gray-600 max-w-xl mb-10">
        Bem-vindo à WorkQueue, onde IA e pessoas constroem o futuro juntos.
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-10 py-3 bg-blue-400 text-white text-lg font-medium rounded-full hover:bg-blue-500 transition shadow-md"
      >
        Explore o mercado de trabalho
      </button>
    </div>
  );
}
