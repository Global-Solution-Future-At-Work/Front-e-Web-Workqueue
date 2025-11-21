import React, { useState, useEffect, useRef } from 'react';
import fotohomem from "../assets/fotohomem.svg"; // Ajuste o caminho se necessário

const ChatFlutuante = () => {
  // Estados de UI
  const [isOpen, setIsOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  
  // Estados de Dados
  const [userData, setUserData] = useState(null); // { id, role }
  const [conversations, setConversations] = useState({}); 
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef(null);

  // 1. Identificar o usuário via Token JWT
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://127.0.0.1:3000/datajwt', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.jwt_data);
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    };

    fetchUserData();
  }, []);

  // 2. Buscar histórico quando abrir o chat
  useEffect(() => {
    if (isOpen && userData) {
      fetchHistory();
    }
  }, [isOpen, userData]);

  // 3. Scroll automático
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChatId, conversations]);

  // --- FUNÇÕES ---

  const fetchHistory = async () => {
    if (!userData) return;
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:3000/mensagem/historico/${userData.role}/${userData.id}`);
      
      if (response.ok) {
        const messages = await response.json();
        processMessages(messages);
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const processMessages = (messages) => {
    const groups = {};
    const myRole = userData.role;
    const myId = userData.id;

    messages.forEach(msg => {
      // Determina o ID do "outro lado" da conversa
      let otherId = null;
      let chatName = "";

      if (myRole === 'user') {
        otherId = msg.id_empresa; // Se sou user, converso com a empresa
        chatName = `Empresa`; 
      } else {
        otherId = msg.id_user; // Se sou empresa, converso com o user
        chatName = `Candidato`;
      }

      // Fallback caso venha nulo (mensagens antigas ou erro)
      if (!otherId) otherId = "desconhecido";

      if (!groups[otherId]) {
        groups[otherId] = {
          id: otherId,
          name: `${chatName} #${otherId.substring(0, 4)}`,
          avatar: fotohomem,
          messages: []
        };
      }

      // NOVA LÓGICA: Verifica quem enviou baseado no campo 'enviado_por'
      // Se o campo não existir (msg antiga), tentamos adivinhar, mas o ideal é o campo novo.
      const isMe = msg.enviado_por === myId;

      groups[otherId].messages.push({
        ...msg,
        text: msg.mensagem,
        isMe: isMe,
        time: new Date(msg.data_criacao).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    });

    // Ordenar por data
    Object.keys(groups).forEach(key => {
      groups[key].messages.sort((a, b) => a.data_criacao - b.data_criacao);
    });

    setConversations(groups);
  };

  const handleSendMessage = async (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && newMessage.trim() && activeChatId) {
      
      const myRole = userData.role;
      const myId = userData.id;
      const targetId = activeChatId;

      // Montagem do Payload
      const payload = {
        mensagem: newMessage,
        // Define o contexto da conversa (Quem participa)
        id_empresa: myRole === 'empresa' ? myId : targetId, 
        id_user: myRole === 'user' ? myId : targetId,
        // CAMPO NOVO: Define quem enviou explicitamente
        enviado_por: myId
      };

      try {
        const response = await fetch('http://127.0.0.1:3000/mensagem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setNewMessage("");
          fetchHistory(); // Atualiza para ver a mensagem
        } else {
           alert("Erro ao enviar mensagem");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  // --- RENDERIZAÇÃO (UI) ---

  const activeConversation = activeChatId ? conversations[activeChatId] : null;
  const conversationList = Object.values(conversations);

  if (!userData) return null;

  return (
    <div className="fixed bottom-4 right-4 z-60">

      {/* JANELA DO CHAT */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl w-80 h-[500px] mb-4 flex flex-col transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fade-in-up overflow-hidden">

          {/* HEADER */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
                {activeChatId && (
                <button onClick={() => setActiveChatId(null)} className="mr-1 hover:bg-blue-700 p-1 rounded transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                )}
                <div>
                    <h3 className="font-bold text-sm">
                        {activeChatId ? activeConversation?.name : 'Minhas Conversas'}
                    </h3>
                    {activeChatId && <span className="text-xs text-blue-200 block">Online</span>}
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* AREA DE CONTEUDO */}
          {activeChatId && activeConversation ? (
            <>
                {/* MENSAGENS */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50 scrollbar-thin" ref={scrollRef}>
                    {activeConversation.messages.length === 0 && (
                        <p className="text-center text-gray-400 text-sm mt-4">Nenhuma mensagem.</p>
                    )}
                    
                    {activeConversation.messages.map((msg, idx) => (
                        <div key={msg.id || idx} className={`flex mb-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                                    msg.isMe
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-none'
                                }`}
                            >
                                <p>{msg.text}</p>
                                <span className={`text-[10px] block text-right mt-1 ${msg.isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* INPUT */}
                <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleSendMessage}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 p-2.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                </div>
            </>
          ) : (
            /* LISTA DE CONVERSAS */
            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : conversationList.length > 0 ? (
                    conversationList.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChatId(chat.id)}
                            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer border-b border-gray-50 dark:border-gray-800 transition-colors group"
                        >
                            <div className="relative">
                                <img src={chat.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-gray-700" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-blue-600 transition-colors">
                                        {chat.name}
                                    </h4>
                                    <span className="text-[10px] text-gray-400">
                                        {chat.messages[chat.messages.length - 1]?.time}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {chat.messages[chat.messages.length - 1]?.text}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                        <p className="text-sm">Nenhuma mensagem encontrada.</p>
                    </div>
                )}
            </div>
          )}
        </div>
      )}

      {/* FAB (Botão Flutuante) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all transform hover:scale-110 hover:shadow-blue-500/30 focus:outline-none ${
            isOpen 
            ? 'bg-gray-700 text-white rotate-90' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isOpen ? <span className="text-3xl">&times;</span> : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
};

export default ChatFlutuante;