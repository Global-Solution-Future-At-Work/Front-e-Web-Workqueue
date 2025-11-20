import React from 'react';
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

const filtersData = [
  { title: 'Área de atuação', options: ['Tecnologia', 'Design', 'Marketing'], type: 'checkbox' },
  { title: 'Localização', options: ['São Paulo', 'Rio de Janeiro', 'Paraná'], type: 'checkbox' },
  { title: 'Tecnologia', options: ['Python', 'React', 'IA'], type: 'checkbox' }
];

const FilterGroup = ({ title, options, type }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h3>
    {options.map(option => (
      <div key={option} className="flex items-center mb-1">
        <input
          id={`${title}-${option}`}
          type={type}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <label htmlFor={`${title}-${option}`} className="ml-2 text-sm text-gray-600 dark:text-gray-300">
          {option}
        </label>
      </div>
    ))}
  </div>
);

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors pt-6 pb-12">

      <div className="max-w-4xl mx-auto mb-4 px-4 sm:px-0 flex gap-4">
        <Link to="/pessoas" className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
          Ver pessoas da WorkQueue 🙋
        </Link>
        <Link to="/empresas" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200">
          Ver empresas parceiras 💼
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mb-8 px-4 sm:px-0">
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-0">

        {/* Filtros */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Filtros</h2>
            {filtersData.map((group, index) => <FilterGroup key={index} {...group} />)}
          </div>
        </div>

        {/* Postagens */}
        <div className="lg:col-span-6">
          <Post data={postData} />
          <Post data={postData} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
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
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-3">Meu perfil 💼</h3>
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-3">Meus lobbies 🏙️</h3>
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100">Recomendações ✨</h3>
          </div>
        </div>

      </div>

      <ChatFlutuante />
    </div>
  );
}