// src/components/AppointmentsList.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentItem from './AppointmentItem'; // Importe o nosso novo componente de item

// A lista agora recebe as funções e as passa para cada item
export default function AppointmentsList({ appointments, onCancel, onRemove, onEdit }) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Próximos Agendamentos</h3>
      
      {/* Aplicamos aqui o scroll e o espaçamento entre os itens */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {appointments && appointments.length > 0 ? (
          appointments.map((apt) => (
            <AppointmentItem
              key={apt._id}
              appointment={apt}
              onCancel={onCancel}
              onRemove={onRemove}
              onEdit={onEdit} // Passando a função para o filho
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">Nenhum agendamento encontrado.</p>
        )}
      </div>

      <Link to="/agendamentos">
        <button className="w-full mt-6 py-2 px-4 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition-colors">
          Ver Todos os Agendamentos
        </button>
      </Link>
    </div>
  );
}