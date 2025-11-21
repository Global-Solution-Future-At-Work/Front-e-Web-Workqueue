import React, { useState } from 'react';

const RecommendationModal = ({ isOpen, onClose, userId, userName }) => {
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/recomendacao', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id_user: userId,
          mensagem: mensagem
        })
      });

      if (response.ok) {
        alert('Recomendação enviada com sucesso!');
        setMensagem("");
        onClose();
      } else {
        alert('Erro ao enviar recomendação.');
      }
    } catch (error) {
      console.error("Erro:", error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
        
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Recomendar {userName}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sua mensagem (anônima ou assinada no texto)
            </label>
            <textarea 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none h-32"
              placeholder="Escreva aqui porque essa pessoa é um bom profissional..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? 'Enviando...' : 'Enviar Recomendação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecommendationModal;