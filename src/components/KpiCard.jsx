// src/components/KpiCard.jsx

import React from 'react';

// Este é um componente reutilizável. Ele recebe 'titulo' e 'valor' como propriedades (props)
// e os exibe em um card estilizado com Tailwind CSS.
export default function KpiCard({titulo, valor}) {
    return (
        <div className="bg-barber-card p-6 rounded-xl shadow-lg test-white transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-sm font-medium text-slate-400">{titulo}</h3>
            <p className="text-3xl font-bold mt-2">{valor}</p>
        </div>
    );
}