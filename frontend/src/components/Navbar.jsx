import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hasToken = localStorage.getItem('token');

  return (
    <nav className="bg-[#0B2A6B] text-white px-8 py-3 shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-semibold">WorkQueue</span>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={toggleMenu}
          aria-label="Alternar Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-sm">
            <li className="hover:underline cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/faleconosco">
                Contato
              </Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/sobre">
                Sobre
              </Link>
            </li>
            <li className={`hover:underline cursor-pointer ${hasToken ? 'hidden' : ''}`}>
              <Link to="/login">
                Login
              </Link>
            </li>
          </ul>

          <button className="bg-white text-[#0B2A6B] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Descubra novas oportunidades
          </button>

          <button
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Alternar Modo Claro/Escuro"
          >
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={`${isMenuOpen ? 'flex' : 'hidden'} 
          md:hidden flex-col items-center mt-4 space-y-3 pb-3 border-t border-white/20`}
      >
        <ul className="flex flex-col items-center gap-3 w-full">
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">Home</li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">Contato</li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">Sobre</li>
          <li className="w-full text-center py-2 hover:bg-white/10 cursor-pointer rounded">Login</li>
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