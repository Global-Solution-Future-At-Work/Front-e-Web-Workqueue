export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#0F172A] text-center px-4 transition-colors">
      
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
        404
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
        Página não encontrada
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Voltar para a Home
      </a>
    </div>
  );
}
