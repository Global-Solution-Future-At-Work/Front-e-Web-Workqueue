import React from 'react';

export default function UserListAdminModal({ isOpen, onClose, users, onDelete }) {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    // Overlay (Fundo escuro)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      
      {/* Container do Modal */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl overflow-hidden m-4 animate-fade-in-down">
        
        {/* Cabeçalho */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">Gerenciar Usuários</h3>
          <button 
            onClick={onClose} 
            className="text-blue-200 hover:text-white text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        {/* Corpo (Tabela com Scroll se for muito grande) */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Nenhum usuário encontrado.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onDelete(user.id)}
                        className="text-red-600 hover:text-red-900 font-semibold hover:bg-red-50 px-3 py-1 rounded transition duration-200"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Rodapé */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}