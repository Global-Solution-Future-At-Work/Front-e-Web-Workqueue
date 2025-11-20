import React from "react";
import { useNavigate } from "react-router-dom";

import fotomaorobo from '../assets/fotomaorobo.svg';

export default function SobrePage() {

  const navigate = useNavigate();

  return (
    <main className="
      flex flex-col md:flex-row items-center justify-center min-h-screen
      bg-gray-50 dark:bg-[#0F172A]
      text-gray-900 dark:text-gray-100
      px-6 py-16 transition-colors
    ">
      
      {/* Área de texto */}
      <div className="md:w-1/2 w-full max-w-2xl pr-0 md:pr-10 mb-10 md:mb-0">
        
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Conheça a <br />
          <span className="underline decoration-blue-400">WorkQueue</span>
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
          A WorkQueue nasceu com o propósito de redefinir a forma como pessoas e
          empresas se conectam no futuro do trabalho. Acreditamos que a
          tecnologia deve potencializar o ser humano — não substituí-lo. Nossa
          missão é usar a inteligência artificial como uma aliada estratégica
          para promover oportunidades mais justas, inclusivas e inteligentes,
          ajudando profissionais a encontrarem seu espaço em um mercado em
          constante transformação. Cada recurso da plataforma foi pensado para
          valorizar competências humanas, incentivar o desenvolvimento contínuo e
          aproximar talentos das empresas que acreditam na inovação responsável.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Nossos valores se baseiam em inclusão, ética e evolução tecnológica
          consciente. A WorkQueue atua para reduzir desigualdades e facilitar o
          acesso a oportunidades por meio de um ecossistema digital transparente
          e colaborativo. Ao unir IA e sensibilidade humana, buscamos criar um
          ambiente onde o crescimento profissional é impulsionado pela
          tecnologia, mas guiado por propósito. Nosso objetivo é simples, mas
          essencial: tornar o futuro do trabalho mais humano, conectado e
          sustentável.
        </p>

      </div>

      {/* Imagem */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={fotomaorobo}
          alt="Tecnologia e Inovação"
          className="rounded-3xl shadow-xl w-full object-cover"
        />
      </div>

    </main>
  );
}
