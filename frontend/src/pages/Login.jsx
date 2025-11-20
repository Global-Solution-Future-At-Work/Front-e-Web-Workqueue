import React, { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Login enviado:', formData);
    alert('Login enviado!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] p-4 transition-colors">

      <div className="bg-white dark:bg-[#1E293B] p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full border border-gray-200 dark:border-gray-700 transition-colors">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Login
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1 mb-4">
            Entre em sua conta WorkQueue
          </p>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Acesse como usuário profissional.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
            >
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-150 shadow-lg"
          >
            Entrar
          </button>

        </form>

      </div>
    </div>
  );
}
