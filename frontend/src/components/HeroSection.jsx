import React from 'react';

const MainLogo = () => (
    <div className="flex items-center">
        
        <div className="bg-blue-900 dark:bg-blue-700 p-4 rounded-xl shadow-xl">
            <svg 
                className="w-16 h-16 text-white" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14a2 2 0 100-4 2 2 0 000 4zm-4-4a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
        </div>

        <div className="ml-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
                WorkQueue
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 font-medium">
                Where AI meets human potential.
            </p>
        </div>
    </div>
);

const HeroSection = () => {
    return (
        <section className="min-h-[calc(100vh-16rem)] flex items-start justify-center pt-24 pb-20 px-4 bg-gray-50 dark:bg-[#0F172A] transition-colors">
            <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
                
                {/* LOGO */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative">
                    <MainLogo />
                    
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-200/50 dark:bg-gray-700/50">
                        <div className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-300 shadow-lg"></div>
                    </div>
                </div>
                
                {/* TEXTO */}
                <div className="w-full lg:w-1/2 text-center lg:text-left relative">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                        Conecte talentos e <br className="hidden md:inline"/> 
                        oportunidades com <span className="text-blue-600 dark:text-blue-400">IA</span>
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 font-light">
                        Recrutamento Inteligente, Lobbies de talentos, Recomendações automáticas
                    </p>

                    {/* BOTÕES */}
                    <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg shadow-xl transition">
                            Entrar com e-mail
                        </button>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Ainda não faz parte da WorkQueue?
                        </p>

                        <a 
                            href="#cadastrar" 
                            className="block text-center sm:inline-block sm:w-auto px-8 py-0 text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                        >
                            <u className="leading-none">Cadastrar-se</u>
                        </a>
                    </div>

                    <div className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 p-3 rounded-full bg-gray-200/50 dark:bg-gray-700/50">
                        <div className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-300 shadow-lg"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
