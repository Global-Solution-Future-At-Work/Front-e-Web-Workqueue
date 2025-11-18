import React from "react";

export default function ModalProfissional({ open, onClose, data }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative">

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex gap-4 items-center">
          <img
            src={data.foto}
            alt={data.nome}
            className="w-24 h-24 object-cover rounded-xl shadow"
          />

          <div>
            <p className="text-gray-600 text-sm">{data.local}</p>
            <h1 className="text-2xl font-bold text-blue-700">{data.nome}</h1>
            <p className="text-gray-700 font-medium">{data.cargo}</p>
            <p className="text-sm text-gray-600">{data.empresa}</p>
          </div>
        </div>

        {/* Biografia */}
        <div className="mt-4">
          <h2 className="font-semibold text-gray-800">Biografia:</h2>
          <p className="text-gray-700 text-sm">{data.bio}</p>
        </div>

        {/* Sessões */}
        <div className="bg-gray-100 p-4 rounded-xl mt-4">
          <h3 className="font-semibold text-gray-800 mb-1">
            Informações Pessoais e Acadêmicas
          </h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• Idade: {data.idade} anos</li>
            <li>• Formação: {data.formacao}</li>
            <li>• Idiomas: {data.idiomas}</li>
            <li>• Disponibilidade: {data.disponibilidade}</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl mt-4">
          <h3 className="font-semibold text-gray-800 mb-1">
            Experiências e Habilidades Técnicas
          </h3>
          {data.experiencias.map((exp, i) => (
            <p key={i} className="text-gray-700 text-sm">• {exp}</p>
          ))}

          <h3 className="font-semibold text-gray-800 mt-2">Habilidades Técnicas:</h3>
          <p className="text-gray-700 text-sm">{data.habilidades}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl mt-4">
          <h3 className="font-semibold text-gray-800 mb-1">
            Soft Skills e Hobbies
          </h3>
          <p className="text-gray-700 text-sm">
            <strong>Soft Skills:</strong> {data.softskills}
          </p>
          <p className="text-gray-700 text-sm mt-1">
            <strong>Hobbies:</strong> {data.hobbies}
          </p>
        </div>

        {/* BOTÕES */}
        <div className="flex justify-between mt-6">
          <button className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">
            Enviar mensagem
          </button>

          <button className="px-6 py-2 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">
            Recomendar profissional
          </button>
        </div>

      </div>
    </div>
  );
}
