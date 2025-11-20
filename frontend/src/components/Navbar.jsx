import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useDarkMode();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

        {/* MOBILE MENU BTN */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-sm">
            <li className="hover:underline cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:underline cursor-pointer"><Link to="/faleconosco">Contato</Link></li>
            <li className="hover:underline cursor-pointer"><Link to="/sobre">Sobre</Link></li>
            <li className="hover:underline cursor-pointer"><Link to="/login">Login</Link></li>
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

      {/* MOBILE MENU */}
      <div
        className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:hidden flex-col items-center mt-4 space-y-3 pb-3
          border-t border-white/20
        `}
      >
        <ul className="flex flex-col items-center gap-3 w-full">
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer">Home</li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer">Contato</li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer">Sobre</li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer">Login</li>
        </ul>
      </div>
    </nav>
  );
}
