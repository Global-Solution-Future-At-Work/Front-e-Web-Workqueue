import React, { useState } from 'react';

export default function CadastroEmpresaForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    atuacao: '',
    tamanho: '',
    descricao: '',
    senha: '',
    confirmarSenha: '',
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

    console.log('Dados submetidos (Empresa):', formData);
    alert('Cadastro enviado! Prosseguindo...');
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
            Cadastro de Empresas
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Divulgue vagas, encontre talentos e otimize seu recrutamento com IA.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome da Empresa:
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail Corporativo:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Senha:
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              minLength="8"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar senha:
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              minLength="8"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Área de atuação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Área de atuação da Empresa:
            </label>
            <input
              type="text"
              name="atuacao"
              value={formData.atuacao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Tamanho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tamanho da Empresa (pequena, média, grande):
            </label>
            <input
              type="text"
              name="tamanho"
              value={formData.tamanho}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição breve da Empresa:
            </label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                         dark:bg-[#0F172A] dark:text-gray-100 rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg text-lg font-semibold transition shadow-lg"
          >
            Próximo
          </button>

        </form>

      </div>
    </div>
  );
}
