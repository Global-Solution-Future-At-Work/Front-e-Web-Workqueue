import React, { useState } from 'react';

export default function CadastroUserForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    atuacao: '',
    experiencia: '',
    localizacao: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Dados submetidos (Usuário Profissional):', formData);
    alert('Cadastro inicial enviado!');

    // Redireciona corretamente após o envio
    window.location.href = '/cadastro-concluido';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] p-4 transition-colors">

      <div className="bg-gray-200 dark:bg-[#1E293B] p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full transition-colors">

        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Cadastre-se
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1 mb-4">
            Crie sua conta na WorkQueue!
          </p>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Cadastro de Usuário Profissional
          </h2>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome completo:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail profissional:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Confirmar senha */}
          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar senha:
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Área de atuação */}
          <div>
            <label htmlFor="atuacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Área de atuação (Tecnologia, Marketing, Design):
            </label>
            <input
              type="text"
              id="atuacao"
              name="atuacao"
              value={formData.atuacao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Experiência */}
          <div>
            <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nível de experiência (Júnior, Pleno, Sênior):
            </label>
            <input
              type="text"
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Localização */}
          <div>
            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Localização (Cidade, Estado):
            </label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-[#0F172A] dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition shadow-lg"
          >
            Próximo
          </button>

        </form>

      </div>
    </div>
  );
}
