import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function CadastroConcluido() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gray-50 dark:bg-[#0F172A] 
                    px-4 text-center transition-colors">

      <img 
        src={logo} 
        alt="WorkQueue Logo"
        className="w-[800px] max-w-full h-auto mb-6 dark:invert dark:brightness-50"
      />

      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Cadastro concluído!
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-10">
        Bem-vindo à WorkQueue, onde IA e pessoas constroem o futuro juntos.
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-10 py-3 bg-blue-500 hover:bg-blue-600 
                   text-white text-lg font-medium rounded-full 
                   transition shadow-md mt-4 mb-10
                   dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Explore o mercado de trabalho
      </button>
    </div>
  );
}
