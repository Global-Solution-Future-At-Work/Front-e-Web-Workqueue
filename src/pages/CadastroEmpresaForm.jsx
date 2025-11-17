import React, { useState } from 'react';


export default function CadastroEmpresaForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cnpj: '',
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
    
    console.log('Dados submetidos (Usuário Profissional):', formData);
    alert('Cadastro inicial enviado! Prosseguindo para o próximo passo do formulário.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="bg-gray-200 p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
                Cadastre-se
            </h1>
            <p className="text-gray-600 mt-1 mb-4">
                Crie sua conta na WorkQueue!
            </p>
            <h2 className="text-xl font-semibold text-gray-700">
                Cadastre-se como uma empresa.
            </h2>
            <p>Divulgue vagas, encontre talentos e otimize seu recrutamento com IA</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Nome da Empresa:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 text-left mb-1">
              CNPJ:
            </label>
            <input
              type="number"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">
              E-mail Corporativo:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 text-left mb-1">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 text-left mb-1">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="atuacao" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Área de atuação da Empresa:
            </label>
            <input
              type="text"
              id="atuacao"
              name="email"
              value={formData.atuacao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="tamanho" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Tamanho da Empresa(pequena, média, grande):
            </label>
            <input
              type="text"
              id="tamanho"
              name="tamanho"
              value={formData.tamanho}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Descrição breve da Empresa:
            </label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-150 shadow-lg"
          >
            Próximo
          </button>

        </form>
        
      </div>
    </div>
  );
}