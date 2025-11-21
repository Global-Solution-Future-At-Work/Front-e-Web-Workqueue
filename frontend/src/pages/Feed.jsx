import React, { useState, useEffect } from 'react'; 
import ChatFlutuante from '../components/ChatFlutuante';
import fotohomem from "../assets/fotohomem.svg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const postData = {
  profileName: 'Alexandre Silva',
  profileTitle: 'Desenvolvedor Full Stack • Next Code Labs',
  timeAgo: '1 d',
  content: 'Finalizamos hoje a primeira fase do nosso projeto de integração da IA Gemini em sistemas corporativos. É incrível ver como a automação e a análise de dados podem tornar os processos mais eficientes e humanos ao mesmo tempo. O futuro do trabalho está acontecendo agora — e é colaborativo.',
  hashtags: ['#Tecnologia', '#InteligenciaArtificial', '#FuturoDoTrabalho', '#WorkQueue'],
  imageUrl: '',
  profilePicUrl: ''
};

const profileCardData = {
  name: 'Rafael Souza',
  title: 'Analista de Dados',
  area: 'Dados, Ciência de Dados e Machine Learning',
  location: 'São Paulo, SP',
  institution: 'TechBridge Solutions',
  profilePicUrl: ''
};

const Post = ({ data }) => (
  <div className="bg-white dark:bg-gray-800 dark:border-gray-700 p-4 rounded-xl shadow-lg border border-gray-100 mb-6">
    <div className="flex items-start mb-3">
      <img
        src={fotohomem}
        alt={data.profileName}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div className="grow">
        <p className="font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          {data.profileName}
          <span className="ml-1 text-blue-600 dark:text-blue-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
          </span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{data.profileTitle} • {data.timeAgo}</p>
      </div>
      <button className="text-gray-400 dark:text-gray-300 hover:text-gray-600">...</button>
    </div>

    <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">{data.content}</p>

    <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
      {data.hashtags.map(tag => (
        <span key={tag} className="mr-1 hover:underline cursor-pointer">
          {tag}
        </span>
      ))}
    </p>

    <img
      src={fotohomem}
      alt="Imagem do Post"
      className="w-full rounded-lg mb-4 object-cover max-h-80"
    />

    <div className="flex justify-around border-t border-gray-100 dark:border-gray-700 pt-3 text-gray-600 dark:text-gray-300 text-sm font-medium">
      <button className="flex items-center hover:text-red-500">❤️ <span className="ml-1">Curtir</span></button>
      <button className="flex items-center hover:text-blue-500">💬 <span className="ml-1">Comentar</span></button>
    </div>
  </div>
);

export default function Feed() {
  const navigate = useNavigate();

  const [perfilLink, setPerfilLink] = useState('/perfiluser');

  // CARREGAR DADOS DA PÁGINA
  useEffect(() => {
    const fetchUserRole = async () => {
      // RECUPERA O TOKEN SALVO
      const token = localStorage.getItem('token');

      if (!token) { // REDIRECIONAR SE NÃO TIVER LOGIN SALVO
        console.log("Token não encontrado, redirecionando para login...");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/datajwt', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          if (data.jwt_data && data.jwt_data.role === 'empresa') {
            setPerfilLink('/perfilempresa');
          } else {
            setPerfilLink('/perfiluser');
          }
        } else {
          console.error('Erro ao validar token');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors pt-6 pb-12 flex flex-col items-center">

      {/* Container dos Botões de Topo */}
      <div className="w-full max-w-4xl mb-4 px-4 sm:px-0 flex gap-4">
        <Link to="/pessoas" className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 text-center">
          Ver pessoas da WorkQueue 🙋
        </Link>
        <Link to="/empresas" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 text-center">
          Ver empresas parceiras 💼
        </Link>
      </div>

      {/* Container do Input de Publicação */}
      <div className="w-full max-w-4xl mb-8 px-4 sm:px-0">
        <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-3 rounded-full shadow-md flex items-center">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>

          <input
            type="text"
            placeholder="“O que você gostaria de publicar hoje?”"
            className="grow p-1.5 bg-transparent text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none mx-3"
          />

          <img
            src={fotohomem}
            alt="Seu Perfil"
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
        </div>
      </div>

      {/* Grid Principal */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-0 justify-center">

        {/* Postagens */}
        <div className="lg:col-span-7">
          <Post data={postData} />
          <Post data={postData} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col items-center text-center sticky top-6">
            <img
              src={fotohomem}
              className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-white"
              alt={profileCardData.name}
            />

            <h3 className="font-bold text-gray-800 dark:text-gray-100">{profileCardData.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{profileCardData.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Área: {profileCardData.area}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Local: {profileCardData.location}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Instituição: {profileCardData.institution}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg sticky top-64">
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-3">
              <Link to={perfilLink}>Meu perfil 💼</Link>
            </h3>

            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-3">
              <Link to="/lobbies-rooms">Lobbies 🏙️</Link>
            </h3>
          </div>
        </div>

      </div>

      <ChatFlutuante />
    </div>
  );
}