export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-6 md:gap-x-24">
      
      <div className="flex items-center gap-3 md:w-1/2 justify-center md:justify-end mb-10 md:mb-0">
        <img
          src="/logo.svg"
          alt="WorkQueue Logo"
          className="w-20 h-20 md:w-24 md:h-24"
        />
        <div>
          <h1 className="text-4xl font-semibold text-[#1a2a6c]">WorkQueue</h1>
          <p className="text-gray-600 text-sm mt-1">
            Where AI meets human potential.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-medium">
          Conecte talentos e oportunidades com IA
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Recrutamento Inteligente, Lobbies de talentos, Recomendações automáticas
        </p>

        <div className="mt-6 flex flex-col items-center md:items-start gap-2">
          <button className="border border-gray-400 text-gray-800 rounded-full px-6 py-2 text-sm hover:bg-gray-100 transition">
            Entrar com e-mail
          </button>
          <p className="text-xs text-gray-500">
            Ainda não faz parte da WorkQueue?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Cadastrar-se
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
