import React, { useState } from 'react';

const dummyConversations = [
  {
    id: 'alexandre',
    name: 'Alexandre Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-e6955c6d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    lastMessage: 'Alexandre Silva: Boa tarde!',
    messages: [
      { id: 1, sender: 'Alexandre Silva', text: 'Boa tarde!', time: '14:30' },
      { id: 2, sender: 'Você', text: 'Olá Alexandre! Como posso ajudar?', time: '14:31' },
    ],
  },
  {
    id: 'suporte',
    name: 'Suporte WorkQueue',
    avatar: 'https://via.placeholder.com/150/007bff/ffffff?text=WQ',
    lastMessage: 'Suporte: Seu ticket foi atualizado.',
    messages: [
      { id: 1, sender: 'Suporte WorkQueue', text: 'Seu ticket #12345 foi atualizado.', time: 'Ontem' },
      { id: 2, sender: 'Você', text: 'Obrigado pela informação!', time: 'Ontem' },
    ],
  },
];

const ChatFlutuante = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) setActiveChat(null);
  };

  const openConversation = (chatId) => setActiveChat(chatId);
  const closeConversation = () => setActiveChat(null);

  const currentChat = activeChat ? dummyConversations.find(chat => chat.id === activeChat) : null;

  return (
    <div className="fixed bottom-4 right-4 z-50">

      {/* CAIXA DO CHAT */}
      {isOpen && (
        <div className="bg-white dark:bg-[#1E293B] shadow-xl rounded-lg w-72 h-96 mb-3 flex flex-col transition-all duration-300 transform origin-bottom-right text-gray-900 dark:text-gray-100">

          {/* CABEÇALHO */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-t-lg flex items-center">
            {activeChat && (
              <button onClick={closeConversation} className="mr-2 text-xl hover:text-gray-300">
                &lt;
              </button>
            )}
            <h3 className="text-lg font-semibold grow">
              {activeChat ? currentChat.name : 'Mensagens'}
            </h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* CHAT ATIVO */}
          {activeChat ? (
            <div className="grow flex flex-col p-3 overflow-y-auto">

              {currentChat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`mb-2 p-2 rounded-lg max-w-[80%] text-sm
                    ${
                      msg.sender === 'Você'
                        ? 'bg-blue-100 dark:bg-blue-900 self-end text-gray-900 dark:text-gray-100'
                        : 'bg-gray-100 dark:bg-gray-800 self-start text-gray-900 dark:text-gray-100'
                    }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 float-right ml-2">{msg.time}</span>
                </div>
              ))}

              {/* INPUT */}
              <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="w-full p-2 border rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          ) : (

            /* LISTA DE CONVERSAS */
            <div className="grow overflow-y-auto">
              {dummyConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => openConversation(conv.id)}
                  className="flex items-center p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">{conv.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-48">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))}

              {dummyConversations.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 p-5">
                  Nenhuma conversa encontrada.
                </p>
              )}
            </div>
          )}

        </div>
      )}

      {/* BOTÃO */
      }
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-blue-600 dark:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        {isOpen ? <>&times;</> : <>💬</>}
      </button>
    </div>
  );
};

export default ChatFlutuante;
