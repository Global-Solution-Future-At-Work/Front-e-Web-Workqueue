import React, { useState, useEffect } from 'react';

export default function GerenciarVagasModal({ onClose }) {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar vagas ao abrir
  useEffect(() => {
    fetch('http://localhost:3000/api/vagas')
      .then(res => res.json())
      .then(data => {
        setVagas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Função de deletar
  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta vaga?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/vagas/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setVagas(vagas.filter(v => v.id !== id)); // Atualiza a lista visualmente
      } else {
        alert("Erro ao deletar vaga");
      }
    } catch (error) {
      console.error("Erro de conexão", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
        
        {/* Cabeçalho Azul */}
        <div className="bg-blue-600 p-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-bold">Gerenciar Vagas Ativas</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 font-bold text-xl">
            &times;
          </button>
        </div>

        {/* Conteúdo da Tabela */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Carregando vagas...</p>
          ) : vagas.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma vaga cadastrada no sistema.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Título da Vaga</th>
                  <th className="pb-3 font-medium">Empresa</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {vagas.map((vaga) => (
                  <tr key={vaga.id} className="border-b last:border-0 border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-bold text-gray-800">#{vaga.id}</td>
                    <td className="py-4">{vaga.titulo}</td>
                    <td className="py-4 text-blue-600">{vaga.empresa}</td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => handleDelete(vaga.id)}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors"
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
        <div className="bg-gray-50 p-4 flex justify-end border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium transition">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}