import React, { useState } from 'react';

export default function PainelLoginAdmin({ aoLogar }) {
  const [codigo, setCodigo] = useState('');

  const handleEnviar = () => {
    if (!codigo) return;

    fetch("http://127.0.01:3000/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "codigo": codigo })
        }
    )
    .then((res) => {
        if (res.status == 200) {
            localStorage.setItem("codigo", codigo)
            aoLogar(); 
        }
    })
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEnviar();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-xs bg-cyan-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-cyan-900 text-sm font-bold mb-2" htmlFor="codigoInput">
            Código
          </label>
          <input
            id="codigoInput"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="shadow appearance-none border border-cyan-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-600 bg-white"
            placeholder="Digite o código"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleEnviar}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 w-full"
            type="button"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}