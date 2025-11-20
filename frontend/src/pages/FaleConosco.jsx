import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatFlutuante from "../components/ChatFlutuante.jsx";

import mulherfoto from "../assets/mulherfoto.svg";

export default function FaleConosco() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 transition-colors">

      <main className="flex flex-col md:flex-row grow">

        {/* IMAGEM LATERAL */}
        <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
          <img
            src={mulherfoto}
            alt="Pessoa atendendo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORMULÁRIO */}
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700">

            {/* LOGO */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="/logo.png"
                alt="WorkQueue Logo"
                className="w-20 h-20 mb-2 dark:invert dark:brightness-50"
              />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                WorkQueue
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                Where AI meets human potential.
              </p>
            </div>

            <h1 className="text-3xl font-semibold text-center mb-2">
              Fale Conosco
            </h1>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
              Quer conversar com a equipe da WorkQueue? Preencha o formulário abaixo.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={form.name}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 
                dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Assunto"
                value={form.subject}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 
                dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
              />

              <textarea
                name="message"
                placeholder="Mensagem"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 
                dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                required
              ></textarea>

              <button
                type="submit"
                className={`p-3 rounded-xl font-semibold transition-all duration-300 text-white ${
                  sent ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {sent ? "Enviado!" : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <ChatFlutuante />
    </div>
  );
}
