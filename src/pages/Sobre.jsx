import React from 'react';

const Sobre = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/2 max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Conheça a <span className="text-blue-700 border-b-4 border-blue-700">WorkQueue</span>
            </h1>

            <p className="text-gray-700 mb-6 leading-relaxed">
              A WorkQueue nasceu com o propósito de redefinir a forma como pessoas e empresas se conectam no futuro do trabalho. Acreditamos que a tecnologia deve potencializar o ser humano — não substituí-lo. Nossa missão é usar a inteligência artificial como uma aliada estratégica para promover oportunidades mais justas, inclusivas e inteligentes, ajudando profissionais a encontrarem seu espaço em um mercado em constante transformação. Cada recurso da plataforma foi pensado para valorizar competências humanas, incentivar o desenvolvimento contínuo e aproximar talentos das empresas que acreditam na inovação responsável.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Nossos valores se baseiam em inclusão, ética e evolução tecnológica consciente. A WorkQueue atua para reduzir desigualdades e facilitar o acesso a oportunidades por meio de um ecossistema digital transparente e colaborativo. Ao unir IA e sensibilidade humana, buscamos criar um ambiente onde o crescimento profissional é impulsionado pela tecnologia, mas guiado por propósito. Nosso objetivo é simples, mas essencial: tornar o futuro do trabalho mais **humano, conectado e sustentável**.
            </p>
          </div>

          <div className="lg:w-1/2 w-full lg:max-w-none shadow-2xl rounded-lg overflow-hidden relative aspect-[16/9] lg:aspect-square">
            
            
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: "url('seu-caminho-para-a-imagem.jpg')",
                backgroundColor: 'rgb(2, 6, 23)', 
              }}
              aria-hidden="true" 
            >
              <div className="absolute inset-0 bg-black opacity-30 mix-blend-multiply"></div>
            </div>

            <div className="relative h-full w-full bg-slate-900 flex items-center justify-center lg:py-0 py-12">
              <span className="text-white text-lg font-semibold opacity-70">
                [Espaço para a Imagem de Fundo de IA/Robô]
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;