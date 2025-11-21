import React, { useState, useEffect } from 'react'; 
import ChatFlutuante from '../components/ChatFlutuante';
import fotohomem from "../assets/fotohomem.svg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TODOS_OS_POSTS = [
  {
    id: 1,
    profileName: 'Alexandre Silva',
    profileTitle: 'Dev Full Stack • Next Code',
    timeAgo: '2 h',
    content: 'Finalizamos hoje a primeira fase da integração com IA Gemini. O futuro é colaborativo! 🚀 #Tech #IA',
    hashtags: ['#Tecnologia', '#Inovacao'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
  },
  {
    id: 2,
    profileName: 'Mariana Costa',
    profileTitle: 'Recruiter • RH Tech',
    timeAgo: '4 h',
    content: 'Dica para quem está buscando a primeira vaga: Soft skills contam tanto quanto código limpo. A comunicação é chave! 🗣️',
    hashtags: ['#Carreira', '#Vagas'],
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
  },
  {
    id: 3,
    profileName: 'Roberto Almeida',
    profileTitle: 'Product Owner • FinTech Sol',
    timeAgo: '5 h',
    content: 'Nada como um café e um board do Jira organizado para começar a semana. Vamos pra cima! ☕',
    hashtags: ['#Produtividade', '#Agile'],
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
  },
  {
    id: 4,
    profileName: 'Carla Dias',
    profileTitle: 'UX Designer • Criativa',
    timeAgo: '1 d',
    content: 'Acabei de liberar o novo layout do app. O foco total foi acessibilidade. Design é para todos! 🎨',
    hashtags: ['#UX', '#Acessibilidade'],
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80'
  },
  {
    id: 5,
    profileName: 'Lucas Pereira',
    profileTitle: 'DevOps • Cloud Systems',
    timeAgo: '1 d',
    content: 'Sexta-feira é dia de deploy? Só para quem tem coragem (e testes automatizados)! 😂',
    hashtags: ['#DevOps', '#Humor'],
    imageUrl: 'https://images.unsplash.com/photo-1535551951406-a19828b8a76b?w=800&q=80'
  },
  {
    id: 6,
    profileName: 'Fernanda Lima',
    profileTitle: 'Marketing Digital • Agency',
    timeAgo: '2 d',
    content: 'Os algoritmos mudam, mas a necessidade de conexão humana permanece. Conteúdo de valor sempre vence.',
    hashtags: ['#Marketing', '#SocialMedia'],
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80'
  },
  {
    id: 7,
    profileName: 'Grupo WorkQueue',
    profileTitle: 'Comunicado Oficial',
    timeAgo: '3 d',
    content: 'Estamos expandindo nossas parcerias! Novas empresas chegando na plataforma na próxima semana.',
    hashtags: ['#Novidade', '#WorkQueue'],
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
  },
  {
    id: 8,
    profileName: 'João Souza',
    profileTitle: 'Estagiário de TI',
    timeAgo: '10 min',
    content: 'Finalmente consegui centralizar a div! Pequenas vitórias. 🙌',
    hashtags: ['#Frontend', '#Estudos'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'
  },
  {
    id: 9,
    profileName: 'Amanda Oliveira',
    profileTitle: 'Gerente de Projetos',
    timeAgo: '6 h',
    content: 'Reunião produtiva é aquela que poderia ter sido um e-mail? Às vezes sim, às vezes o olho no olho resolve tudo.',
    hashtags: ['#Gestao', '#Lideranca'],
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
  },
  {
    id: 10,
    profileName: 'Ricardo Santos',
    profileTitle: 'Analista de Segurança',
    timeAgo: '12 h',
    content: 'Lembrete amigável: troquem suas senhas e ativem o 2FA. A segurança começa pelo básico. 🔒',
    hashtags: ['#CyberSec', '#Dica'],
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80'
  },
  {
    id: 11,
    profileName: 'Beatriz Rocha',
    profileTitle: 'Data Scientist',
    timeAgo: '1 d',
    content: 'Dados não mentem, mas a interpretação deles pode enganar. Cuidado com o viés de confirmação!',
    hashtags: ['#DataScience', '#Analise'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
  {
    id: 12,
    profileName: 'Carlos Mendes',
    profileTitle: 'CEO • StartUp X',
    timeAgo: '2 d',
    content: 'O segredo não é ter a ideia perfeita, é ter a execução consistente. Bom dia a todos!',
    hashtags: ['#Empreendedorismo', '#Business'],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'
  },
  {
    id: 13,
    profileName: 'Juliana Paes',
    profileTitle: 'Arquiteta de Software',
    timeAgo: '3 h',
    content: 'Refatorar código antigo é como arqueologia: você descobre coisas que nem sabia que existiam.',
    hashtags: ['#Coding', '#Legacy'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  },
  {
    id: 14,
    profileName: 'Pedro Henrique',
    profileTitle: 'Suporte Técnico',
    timeAgo: '30 min',
    content: 'Você já tentou reiniciar o modem? A pergunta que salva vidas (e conexões). 📞',
    hashtags: ['#Suporte', '#TechLife'],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80'
  },
  {
    id: 15,
    profileName: 'Larissa Manoela',
    profileTitle: 'Scrum Master',
    timeAgo: '4 h',
    content: 'Daily de 15 minutos é daily de 15 minutos. Vamos respeitar o timebox, pessoal! ⏱️',
    hashtags: ['#Scrum', '#Agile'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  },
  {
    id: 16,
    profileName: 'Vitor Hugo',
    profileTitle: 'Freelancer',
    timeAgo: '5 d',
    content: 'Trabalhar de casa tem seus desafios, mas não trocaria meu setup por nada. 🏡💻',
    hashtags: ['#RemoteWork', '#HomeOffice'],
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&q=80'
  },
  {
    id: 17,
    profileName: 'Camila Torres',
    profileTitle: 'Tech Recruiter',
    timeAgo: '1 h',
    content: 'Buscando devs Java Sênior para projeto internacional. Interessados chamem na DM!',
    hashtags: ['#VagasTI', '#Java'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
  },
  {
    id: 18,
    profileName: 'Bruno Gagliasso',
    profileTitle: 'Investidor Anjo',
    timeAgo: '1 sem',
    content: 'Olhando para o mercado de IA no Brasil com muito otimismo. Temos talentos incríveis aqui.',
    hashtags: ['#Investimento', '#Brasil'],
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80'
  },
  {
    id: 19,
    profileName: 'Patrícia Abravanel',
    profileTitle: 'Diretora de Mídia',
    timeAgo: '2 h',
    content: 'A tv e a internet não são inimigas, são complementares. O conteúdo transmidiático é o presente.',
    hashtags: ['#Midia', '#Comunicacao'],
    imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&q=80'
  },
  {
    id: 20,
    profileName: 'Eduardo Costa',
    profileTitle: 'Engenheiro de Redes',
    timeAgo: '45 min',
    content: 'Configurando VLANs e tomando café. A paz de um servidor bem configurado não tem preço.',
    hashtags: ['#Network', '#Cisco'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b01201b?w=800&q=80'
  }
];

const Post = ({ data }) => {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50)); 
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 p-4 rounded-xl shadow-lg border border-gray-100 mb-6 transition-all hover:shadow-xl">
      <div className="flex items-start mb-3">
        <img
          src={data.profilePicUrl || fotohomem} 
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

      <p className="text-sm text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">{data.content}</p>

      <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
        {data.hashtags && data.hashtags.map((tag, index) => (
          <span key={index} className="mr-1 hover:underline cursor-pointer">
            {tag}
          </span>
        ))}
      </p>
      
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt="Imagem do Post"
          className="w-full rounded-lg mb-4 object-cover max-h-80"
        />
      )}

      <div className="flex items-center border-t border-gray-100 dark:border-gray-700 pt-3 text-sm font-medium">
        <button 
          onClick={handleLike}
          className={`flex items-center transition-colors duration-200 ${liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300 hover:text-red-500'}`}
        >
          <span className="text-lg mr-1">{liked ? '❤️' : '🤍'}</span> 
          <span>{likes} Curtidas</span>
        </button>
      </div>
    </div>
  );
};

export default function Feed() {
  const navigate = useNavigate();
  const [perfilLink, setPerfilLink] = useState('/perfiluser');
  const [postsExibidos, setPostsExibidos] = useState([]);
  const [novoPostTexto, setNovoPostTexto] = useState('');

  const [userProfile, setUserProfile] = useState({
    name: 'Carregando...',
    title: '...',
    area: '...',
    location: '...',
    institution: '...',
    profilePicUrl: fotohomem
  });

  const handlePublicar = () => {
    if (novoPostTexto.trim() === '') return;

    const novoPost = {
      id: Date.now(),
      profileName: userProfile.name,
      profileTitle: userProfile.title,
      timeAgo: 'Agora mesmo',
      content: novoPostTexto,
      hashtags: ['#WorkQueue'], 
      imageUrl: null,
      profilePicUrl: userProfile.profilePicUrl
    };

    setPostsExibidos([novoPost, ...postsExibidos]);
    setNovoPostTexto('');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return;
      }

      try {
        const authResponse = await fetch('http://localhost:3000/datajwt', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });

        if (authResponse.ok) {
          const authData = await authResponse.json();
          const { id, role } = authData.jwt_data;
          
          let urlLista = '';
          
          if (role === 'empresa') {
            setPerfilLink('/perfilempresa');
            urlLista = 'http://localhost:3000/empresa';
          } else {
            setPerfilLink('/perfiluser');
            urlLista = 'http://localhost:3000/user';
          }

          const listaResponse = await fetch(urlLista, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
          });

          if (listaResponse.ok) {
            const listaCompleta = await listaResponse.json();
            const meuPerfil = listaCompleta.find(item => item.id === id);

            if (meuPerfil) {
                if (role === 'empresa') {
                    setUserProfile({
                        name: meuPerfil.nome_empresa,
                        title: meuPerfil.area_atuacao || 'Empresa Parceira',
                        area: meuPerfil.tamanho || 'Corporativo',
                        location: meuPerfil.localizacao || 'Local não informado',
                        institution: meuPerfil.site || 'Website',
                        profilePicUrl: fotohomem
                    });
                } else {
                    let instituicaoExibida = 'Disponível para trabalho';
                    if (meuPerfil.experiencias && meuPerfil.experiencias.length > 0) {
                        instituicaoExibida = meuPerfil.experiencias[0].empresa;
                    } else if (meuPerfil.formacao && meuPerfil.formacao.length > 0) {
                        instituicaoExibida = meuPerfil.formacao[0].instituicao;
                    }

                    setUserProfile({
                        name: meuPerfil.nome,
                        title: meuPerfil.cargo || 'Usuário WorkQueue',
                        area: meuPerfil.area || 'Geral',
                        location: meuPerfil.localizacao || 'Brasil',
                        institution: instituicaoExibida,
                        profilePicUrl: meuPerfil.foto || fotohomem
                    });
                }
            }
          }
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUserData();

    const selecionarPostsAleatorios = () => {
      const embaralhado = [...TODOS_OS_POSTS].sort(() => 0.5 - Math.random());
      setPostsExibidos(embaralhado.slice(0, 3));
    };

    selecionarPostsAleatorios();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors pt-6 pb-12 flex flex-col items-center">

      <div className="w-full max-w-4xl mb-4 px-4 sm:px-0 flex gap-4">
        <Link to="/pessoas" className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 text-center">
          Ver pessoas da WorkQueue 🙋
        </Link>
        <Link to="/empresas" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 text-center">
          Ver empresas parceiras 💼
        </Link>
      </div>

      <div className="w-full max-w-4xl mb-8 px-4 sm:px-0">
        <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-3 rounded-full shadow-md flex items-center border border-gray-200 dark:border-gray-700 focus-within:border-blue-500 transition-colors">
          
          <button 
            onClick={handlePublicar}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 p-2 rounded-full transition-colors ml-1"
            title="Publicar"
          >
            <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>

          <input
            type="text"
            value={novoPostTexto}
            onChange={(e) => setNovoPostTexto(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePublicar()}
            placeholder={`“O que você gostaria de publicar hoje, ${userProfile.name.split(' ')[0]}?”`}
            className="grow p-1.5 bg-transparent text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none mx-3"
          />

          <img
            src={userProfile.profilePicUrl}
            alt="Seu Perfil"
            className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-0 justify-center">

        <div className="lg:col-span-7">
          {postsExibidos.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col items-center text-center sticky top-6">
            <img
              src={userProfile.profilePicUrl}
              className="w-16 h-16 rounded-full object-cover mb-3 border-4 border-gray-50 dark:border-gray-700"
              alt={userProfile.name}
            />

            <h3 className="font-bold text-gray-800 dark:text-gray-100">{userProfile.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{userProfile.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Área: {userProfile.area}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Local: {userProfile.location}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{userProfile.institution}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg sticky top-80">
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-3">
              <Link to={perfilLink} className="hover:text-blue-600 transition-colors flex items-center">
                <span className="mr-2">💼</span> Meu perfil
              </Link>
            </h3>

            <h3 className="text-md font-bold text-gray-800 dark:text-gray-100 mb-3">
              <Link to="/lobbies-rooms" className="hover:text-blue-600 transition-colors flex items-center">
                <span className="mr-2">🏙️</span> Lobbies
              </Link>
            </h3>
          </div>
        </div>

      </div>

      <ChatFlutuante />
    </div>
  );
}