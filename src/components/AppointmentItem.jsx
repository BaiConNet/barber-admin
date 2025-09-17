// src/components/AppointmentItem.jsx

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react'; // Importe os ícones que vamos usar

// Este componente recebe o objeto 'appointment' e as funções 'onCancel', 'onRemove', 'onEdit' do componente pai.
export default function AppointmentItem({ appointment, onCancel, onRemove, onEdit }) {
  
  // Lógica para definir a cor do status
  const statusColors = {
    CONCLUIDO: 'bg-green-500/20 text-green-400',
    CANCELADO: 'bg-red-500/20 text-red-400',
    AGENDADO: 'bg-blue-500/20 text-blue-400',
    PENDENTE: 'bg-yellow-500/20 text-yellow-400',
  };
  
  const statusClass = statusColors[appointment.status] || 'bg-gray-500/20 text-gray-400';

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4 border border-gray-700">
      
      {/* Grupo da Esquerda: Avatar e Informações */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
          <span className="text-xl font-bold">{appointment.cliente?.nome[0]}</span>
        </div>
        <div>
          <p className="font-bold text-white">{appointment.cliente?.nome}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{appointment.servico?.nome}</span>
            <span>•</span>
            <span>{appointment.cliente?.telefone}</span>
          </div>
        </div>
      </div>

      {/* Grupo da Direita: Status e Ações */}
      <div className="flex items-center gap-4">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {appointment.status}
        </span>
        
        {/* === AQUI ENTROU O CÓDIGO QUE VOCÊ PERGUNTOU === */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(appointment)}
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
            title="Editar Status"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onRemove(appointment._id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Remover Agendamento"
          >
            <Trash2 className="h-4 w-4" /> 
          </button>
        </div>
      </div>
    </div>
  );
}