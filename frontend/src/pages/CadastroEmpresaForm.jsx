import React, { useState } from 'react';

export default function CadastroEmpresaForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    atuacao: '',
    tamanho: '',
    descricao: '',
    localizacao: '', // Adicionado pois o backend utiliza
    site: '',        // Adicionado pois o backend utiliza
    senha: '',
    confirmarSenha: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setLoading(true);

    // Preparar o payload conforme esperado pelo backend (/register/empresa)
    const payload = {
      nome_empresa: formData.nome,
      email_corporativo: formData.email,
      senha: formData.senha,
      area_atuacao: formData.atuacao,
      tamanho: formData.tamanho,
      descricao: formData.descricao,
      localizacao: formData.localizacao,
      site: formData.site
    };

    try {
      const response = await fetch('http://localhost:3000/register/empresa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar empresa');
      }

      // Sucesso
      alert('Empresa cadastrada com sucesso!');
      console.log('Sucesso:', data);
      window.location.href = '/login';

    } catch (error) {
      console.error('Erro:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
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
            <p className="text-sm text-gray-500">Divulgue vagas, encontre talentos e otimize seu recrutamento com IA</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded text-center ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

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
              name="atuacao"
              value={formData.atuacao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="tamanho" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Tamanho da Empresa (pequena, média, grande):
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

          <div>
            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Localização (Sede):
            </label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="site" className="block text-sm font-medium text-gray-700 text-left mb-1">
              Site da Empresa:
            </label>
            <input
              type="text"
              id="site"
              name="site"
              value={formData.site}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 px-4 py-3 text-white rounded-lg text-lg font-semibold transition duration-150 shadow-lg ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Enviando...' : 'Cadastrar Empresa'}
          </button>

        </form>
        
      </div>
    </div>
  );
}