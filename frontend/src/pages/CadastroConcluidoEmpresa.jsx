import { useNavigate } from "react-router-dom";

export default function CadastroConcluido() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gray-50 dark:bg-[#0F172A] px-4 text-center transition-colors">

      <img 
        src="/logo.svg" 
        alt="WorkQueue Logo" 
        className="w-28 mb-6 dark:invert dark:brightness-50"
      />

      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Cadastro concluído!
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-10">
        Bem-vindo à WorkQueue, onde IA e pessoas constroem o futuro juntos.
      </p>

      <button
        onClick={() => (window.location.href = '/')}
        className="px-10 py-3 bg-blue-500 hover:bg-blue-600 
                   text-white text-lg font-medium rounded-full 
                   transition shadow-md dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Acesse o painel para publicar vagas e explorar o lobby de talentos.
      </button>
    </div>
  );
}
