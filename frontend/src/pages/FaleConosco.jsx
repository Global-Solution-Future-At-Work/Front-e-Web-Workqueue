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

    // --- LÓGICA DO MAILTO ADICIONADA AQUI ---
    
    // 1. Defina o e-mail que receberá a mensagem
    const destinatario = "contato@workqueue.com"; // ALTERE PARA SEU E-MAIL
    
    // 2. Prepara o assunto e o corpo da mensagem (codificando para URL)
    const assunto = encodeURIComponent(form.subject || "Novo contato via Site");
    const corpo = encodeURIComponent(`Nome: ${form.name}\n\nMensagem:\n${form.message}`);
    
    // 3. Abre o cliente de e-mail
    window.location.href = `mailto:workqueueai@gmail.com?subject=${assunto}&body=${corpo}`;

    // ----------------------------------------

    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

      <main className="flex flex-col md:flex-row grow">

        <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
          <img
            src={mulherfoto}
            alt="Pessoa atendendo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

            <div className="flex flex-col items-center mb-6">
              <img
                src="/logo.png"
                alt="WorkQueue Logo"
                className="w-20 h-20 mb-2"
              />
              <h2 className="text-2xl font-bold text-gray-800">WorkQueue</h2>
              <p className="text-sm text-gray-500 -mt-1">
                Where AI meets human potential.
              </p>
            </div>

            <h1 className="text-3xl font-semibold text-center mb-2">
              Fale Conosco
            </h1>
            <p className="text-center text-sm text-gray-600 mb-6">
              Quer conversar com a equipe da WorkQueue? Preencha o formulário abaixo.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={form.name}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Assunto"
                value={form.subject}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
              />

              <textarea
                name="message"
                placeholder="Mensagem"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
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