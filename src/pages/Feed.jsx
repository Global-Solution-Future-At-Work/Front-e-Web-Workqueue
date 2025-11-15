import React from 'react';
import ChatFlutuante from '../components/ChatFlutuante';

const postData = {
  profileName: 'Alexandre Silva',
  profileTitle: 'Desenvolvedor Full Stack • Next Code Labs',
  timeAgo: '1 d',
  content: 'Finalizamos hoje a primeira fase do nosso projeto de integração da IA Gemini em sistemas corporativos. É incrível ver como a automação e a análise de dados podem tornar os processos mais eficientes e humanos ao mesmo tempo. O futuro do trabalho está acontecendo agora — e é colaborativo.',
  hashtags: ['#Tecnologia', '#InteligenciaArtificial', '#FuturoDoTrabalho', '#WorkQueue'],
  imageUrl: 'https://images.unsplash.com/photo-1518770660439-4630ee741753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Imagem do post (ex: Gemini)
  profilePicUrl: 'https://images.unsplash.com/photo-1507003211169-e6955c6d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
};

const profileCardData = {
  name: 'Rafael Souza',
  title: 'Analista de Dados',
  area: 'Dados, Ciência de Dados e Machine Learning',
  location: 'São Paulo, SP',
  institution: 'TechBridge Solutions',
  profilePicUrl: 'https://images.unsplash.com/photo-1519085360753-47e7ef464208?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const filtersData = [
    {
        title: 'Área de atuação',
        options: ['Tecnologia', 'Design', 'Marketing'],
        type: 'checkbox'
    },
    {
        title: 'Localização',
        options: ['São Paulo', 'Rio de Janeiro', 'Paraná'],
        type: 'checkbox'
    },
    {
        title: 'Tecnologia',
        options: ['Python', 'React', 'IA'],
        type: 'checkbox'
    }
];



const FilterGroup = ({ title, options, type }) => (
    <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
        {options.map(option => (
            <div key={option} className="flex items-center mb-1">
                <input
                    id={`${title}-${option}`}
                    type={type}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`${title}-${option}`} className="ml-2 text-sm text-gray-600">
                    {option}
                </label>
            </div>
        ))}
    </div>
);


const Post = ({ data }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6">
        {/* Cabeçalho do Post */}
        <div className="flex items-start mb-3">
            <img 
                src={data.profilePicUrl}
                alt={data.profileName}
                className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="grow">
                <p className="font-semibold text-gray-800 flex items-center">
                    {data.profileName}
                    <span className="ml-1 text-blue-600">
                        {/* Ícone de verificação (SVG simples) */}
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    </span>
                </p>
                <p className="text-xs text-gray-500">{data.profileTitle} • {data.timeAgo}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 text-xl">
                ... 
            </button>
        </div>

       
        <p className="text-sm text-gray-800 mb-4">{data.content}</p>
        
        <p className="text-xs text-blue-600 mb-4">
            {data.hashtags.map(tag => <span key={tag} className="mr-1 hover:underline cursor-pointer">{tag}</span>)}
        </p>

        <img 
            src={data.imageUrl} 
            alt="Imagem do Post" 
            className="w-full rounded-lg mb-4 object-cover max-h-80"
        />

        
        <div className="flex justify-around border-t border-gray-100 pt-3 text-gray-600 text-sm font-medium">
            <button className="flex items-center hover:text-red-500 transition-colors">
                ❤️ <span className="ml-1">Curtir</span> 
            </button>
            <button className="flex items-center hover:text-blue-500 transition-colors">
                💬 <span className="ml-1">Comentar</span> 
            </button>
        </div>
    </div>
);


export default function Feed() {

  return (
    <div className="min-h-screen bg-gray-100 pt-6 pb-12">
      
      <div className="max-w-4xl mx-auto mb-8 px-4 sm:px-0">
        <div className="bg-white p-3 rounded-full shadow-md flex items-center">
            <svg className="w-5 h-5 text-gray-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
                type="text"
                placeholder="“O que você gostaria de publicar hoje?”"
                className="grow p-1.5 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent mx-3"
            />
            <img
                src={profileCardData.profilePicUrl}
                alt="Seu Perfil"
                className="w-8 h-8 rounded-full object-cover mr-2"
            />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-0">
        
        <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-xl shadow-lg sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filtros</h2>
            {filtersData.map((group, index) => (
                <FilterGroup key={index} {...group} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <Post data={postData} />
          <Post data={postData} /> 
        </div>

        <div className="lg:col-span-3 space-y-6">
            
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center text-center sticky top-6">
            <img
                src={profileCardData.profilePicUrl}
                alt={profileCardData.name}
                className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-white"
            />
            <h3 className="font-bold text-gray-800">{profileCardData.name}</h3>
            <p className="text-sm text-gray-600">{profileCardData.title}</p>
            <p className="text-xs text-gray-500 mt-2">
                Área: {profileCardData.area}
            </p>
            <p className="text-xs text-gray-500">
                Local: {profileCardData.location}
            </p>
            <p className="text-xs text-gray-500">
                Instituição: {profileCardData.institution}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-lg sticky top-64"> 
            <h3 className="text-md font-bold text-gray-800 mb-3">Meu perfil 💼</h3>
            <h3 className="text-md font-bold text-gray-800 mb-3">Meus lobbies 🏙️</h3>
            <h3 className="text-md font-bold text-gray-800">Recomendações ✨</h3>
          </div>
        </div>

      </div>
      <ChatFlutuante />
    </div>
  );
}