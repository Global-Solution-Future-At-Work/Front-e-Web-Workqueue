import { Link, useNavigate } from "react-router-dom";
import logonome from "../assets/logonome.svg";

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <main
      className="
        flex flex-col md:flex-row items-center justify-center
        min-h-screen
        bg-gray-50 dark:bg-[#0F172A]
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
        px-6 md:gap-x-24
      "
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 md:w-1/2 justify-center md:justify-end mb-10 md:mb-0">
        <img
          src={logonome}
          alt="WorkQueue Logo"
          className="w-[2000px] h-auto brightness-100 dark:invert dark:brightness-50 transition-all"
        />
      </div>

      {/* TEXTO */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-medium">
          Conecte talentos e oportunidades com IA
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 transition-colors">
          Recrutamento Inteligente, Lobbies de talentos, Recomendações automáticas
        </p>

        {/* BOTÕES */}
        <div className="mt-6 flex flex-col items-center md:items-start gap-2">
          <button
            className="
              border border-gray-400 dark:border-gray-600
              text-gray-800 dark:text-gray-200
              bg-white dark:bg-gray-800
              rounded-full px-6 py-2 text-sm
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors duration-300
            "
          >
            Entrar com e-mail
          </button>

          <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors">
            Ainda não faz parte da WorkQueue?{" "}
            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              <Link to="/escolher-tipo">Cadastrar-se</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
