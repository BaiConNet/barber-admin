import React from 'react';

export default function Header() {
    return (
        <header className="w-full bg-green-600 h-16 flex items-center justify-between px-6 shadow">
            <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl">Barber Admin</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-white">🔔</button>
                <button className="text-white">⚙️</button>
                <span className="text-white">Olá, Usuario</span>
            </div>
        </header>
    );
}