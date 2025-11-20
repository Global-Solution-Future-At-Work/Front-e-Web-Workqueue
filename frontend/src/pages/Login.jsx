import React, { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      setIsLoading(true);

      // --- SEU ENDPOINT DE LOGIN ---
      const endpoint = 'http://127.0.0.1:3000/login'; 
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha, 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Trata erros como "Senha incorreta" ou "Usuário não encontrado"
        throw new Error(data.message || 'Credenciais inválidas.');
      }

      // --- SUCESSO NO LOGIN ---
      console.log('Login realizado:', data);
      
      // 1. Salvar o Token (Exemplo usando localStorage)
      // Adapte 'accessToken' para o nome que sua API retorna (ex: data.token, data.jwt)
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }

      // 2. Salvar dados do usuário (opcional)
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // 3. Redirecionar para a dashboard
      // Se estiver usando React Router: navigate('/dashboard');
      window.location.href = '/feed';

    } catch (err) {
      console.error('Erro de login:', err);
      setError(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
        
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Bem-vindo(a)!</h1>
            <p className="text-gray-500 mt-2">
                Insira suas credenciais para acessar a WorkQueue.
            </p>
        </div>

        {/* Feedback de Erro */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-50"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
                </label>
                {/* Link para recuperação de senha (Opcional) */}
                <a href="/recuperar-senha" class="text-sm text-blue-600 hover:underline">
                    Esqueceu a senha?
                </a>
            </div>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition duration-150 shadow-md flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="/cadastro" className="text-blue-600 font-semibold hover:underline">
                Cadastre-se
            </a>
        </div>

      </div>
    </div>
  );
}