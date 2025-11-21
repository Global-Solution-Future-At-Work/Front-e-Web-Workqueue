import React from 'react';
import { Instagram, X } from 'lucide-react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
//
export default function Footer() {
  return (
    <footer
      className="
        bg-gray-300 
        dark:bg-[#0A0F1E]
        text-gray-700 
        dark:text-gray-300
        pt-12 pb-6
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="flex flex-col md:flex-row justify-between pb-8 space-y-8 md:space-y-0">

          <div className="flex flex-col space-y-4 items-start w-full md:w-auto">
            <img
              src={logo}
              alt="Logo WorkQueue"
              className="w-12 h-12"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              &copy; 2025 Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flew-wrap gap-12 text-sm justify-between md:justify-start w-full md:w-auto">
            <div className>
              <h1 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center text-2xl mt-6">
                Páginas
              </h1>
              <ul className="space-y-1 flex gap-5">
                <li className="hover:underline cursor-pointer"><Link to="/">Home</Link></li>
                <li className="hover:underline cursor-pointer"><Link to="/sobre">Sobre</Link></li>
                <li className="hover:underline cursor-pointer"><Link to="/faleconosco">Contato</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-4 items-start md:items-end w-full md:w-auto mt-8 md:mt-0">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-300">@workqueue</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2 rounded-full 
                  bg-gray-300 dark:bg-gray-700 
                  hover:bg-gray-400 dark:hover:bg-gray-600
                  transition-colors
                "
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-300">@work_queue</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  p-2 rounded-full 
                  bg-gray-300 dark:bg-gray-700 
                  hover:bg-gray-400 dark:hover:bg-gray-600
                  transition-colors
                "
                aria-label="X (Twitter)"
              >
                <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
