import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 shadow">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-white p-2 hover:bg-white/20 rounded-lg">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <span className="text-white font-bold text-xl">Barber Admin</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200">
          🔔
        </button>
        <button className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200">
          ⚙️
        </button>

        <div className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
          <UserCircleIcon className="w-10 h-10 text-white" />
          {/*<img 
                      src="https://via.placeholder.com/40" 
                      alt="Usuario"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />*/}
          <span className="text-white">Olá, Usuario</span>
        </div>
      </div>
    </header>
  );
}
