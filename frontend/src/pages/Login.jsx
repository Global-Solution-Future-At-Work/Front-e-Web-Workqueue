import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Define para onde ir após o login
  const from = location.state?.from?.pathname || '/feed';

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Verifica se já está logado
  useEffect(() => {
    const hasToken = localStorage.getItem('token');
    if (hasToken) {
      // Redireciona imediatamente se já tiver token
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpar erros de antes

    try {
      setIsLoading(true);

      // ENDPOINT DE LOGIN
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
        throw new Error(data.message || 'Credenciais inválidas.');
      }

      // LOGIN BEM SUCEDIDO
      console.log('Login realizado:', data);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      navigate(from, { replace: true });

    } catch (err) {
      console.error('Erro de login:', err);
      setError(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bem-vindo(a)!</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                Insira suas credenciais para acessar a WorkQueue.
            </p>
        </div>

        {/* Feedback para caso de Erro */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
            >
              E-mail:
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>

            <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
            >                Senha
                </label>
                <Link to="/recuperar-conta" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Esqueceu a senha?
                </Link>
            </div>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength="8"
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 px-4 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 active:bg-blue-800 transition duration-150 shadow-md flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Entrar'}
          </button>

        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/escolher-tipo" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cadastre-se
            </Link>
        </div>

      </div>
    </div>
  );
}
