// src/components/Logo.jsx

import React from 'react';
// Não precisamos mais do ícone, o logo será puramente tipográfico
// import { TerminalSquare } from 'lucide-react';

export default function Logo({ className }) {
  return (
    <a href="/home" className={`flex items-center text-slate-200 ${className}`}>
      
      {/* O nome da empresa com o novo design */}
      <div className="text-xl font-bold tracking-wider">
        
        {/* A MÁGICA DO GRADIENTE ACONTECE AQUI */}
        <span 
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text"
        >
          JWT
        </span>

        {/* O resto do nome e o cursor */}
        <span className="font-semibold text-slate-300">
          {' '}House
          {/* O cursor que pisca, usando animação do Tailwind */}
          <span className="inline-block w-[2px] h-5 bg-amber-400 ml-1 opacity-70 animate-pulse"></span>
        </span>
      </div>
    </a>
  );
}