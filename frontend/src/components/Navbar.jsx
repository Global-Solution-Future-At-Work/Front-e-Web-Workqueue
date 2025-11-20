import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useDarkMode();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hasToken = localStorage.getItem('token');

  // Função para realizar o logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Opcional: remove dados do usuário se houver
    window.location.reload(); // Recarrega a página para atualizar a UI
    // ou use: window.location.href = '/login'; para redirecionar
  };

  return (
    <nav
      className="
        bg-[#0B2A6B] 
        dark:bg-[#0A0F1E]
        text-white 
        px-8 py-3 shadow 
        transition-colors duration-300
      "
    >
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 dark:invert dark:brightness-50" />
          <span className="text-xl font-semibold">WorkQueue</span>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* --- MENU DESKTOP --- */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-sm">
            <li className="hover:underline cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/faleconosco">Contato</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/sobre">Sobre</Link>
            </li>
            
            {/* Se NÃO tem token, mostra Login */}
            {!hasToken && (
              <li className="hover:underline cursor-pointer">
                <Link to="/login">Login</Link>
              </li>
            )}

            {/* Se TEM token, mostra Sair */}
            {hasToken && (
              <li 
                className="hover:underline cursor-pointer text-red-300 hover:text-red-200" 
                onClick={handleLogout}
              >
                Sair
              </li>
            )}
          </ul>

          {/* CTA BUTTON */}
          <button
            className="
              bg-white dark:bg-[#152238]
              text-[#0B2A6B] dark:text-white
              px-4 py-2 rounded-lg text-sm font-medium
              hover:bg-gray-100 dark:hover:bg-[#1C2944]
              transition-colors
            "
          >
            Descubra novas oportunidades
          </button>

          {/* DARK MODE BUTTON */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              p-2 rounded-full 
              bg-gray-200 dark:bg-gray-700
              text-gray-900 dark:text-white
              hover:bg-gray-300 dark:hover:bg-gray-600
              transition-colors duration-300
            "
            aria-label="Alternar modo claro/escuro"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- MENU MOBILE --- */}
      <div
        className={`${isMenuOpen ? 'flex' : 'hidden'} 
          md:hidden flex-col items-center mt-4 space-y-3 pb-3 border-t border-white/20`}
      >
        <ul className="flex flex-col items-center gap-3 w-full">
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">
            <Link to="/">Home</Link>
          </li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">
             <Link to="/faleconosco">Contato</Link>
          </li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">
             <Link to="/sobre">Sobre</Link>
          </li>

          {/* Lógica Login/Sair no Mobile */}
          {!hasToken && (
            <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">
              <Link to="/login">Login</Link>
            </li>
          )}

          {hasToken && (
            <li 
              className="w-full text-center py-2 hover:bg-red-500/20 cursor-pointer rounded text-red-300"
              onClick={handleLogout}
            >
              Sair
            </li>
          )}
        </ul>

        <button className="w-full bg-white text-[#0B2A6B] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors mt-3">
          Descubra novas oportunidades
        </button>

        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors mt-3"
          aria-label="Alternar Modo Claro/Escuro"
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
