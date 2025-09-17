// src/components/EditStatusModal.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// O modal recebe o agendamento, uma função para fechar (onClose) e uma para salvar (onSave)
export default function EditStatusModal({ appointment, onClose, onSave }) {
  // Estado interno para controlar o valor do <select>
  const [newStatus, setNewStatus] = useState(appointment.status);
  
  // Opções de status que o barbeiro pode escolher
  const statusOptions = ["PENDENTE", "CONFIRMADO", "CONCLUIDO", "CANCELADO", "NAO_COMPARECEU"];

  const handleSave = () => {
    // Chama a função onSave que veio do Dashboard, passando o ID e o novo status
    onSave(appointment._id, newStatus);
  };

  return (
    <AnimatePresence>
      {/* Fundo semi-transparente (overlay) que fecha o modal ao clicar */}
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* O card do modal. O e.stopPropagation() impede que o clique dentro dele feche o modal */}
        <motion.div
          className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Alterar Status do Agendamento</h2>
          <p className="text-gray-400 mb-2">Cliente: <span className="text-white font-medium">{appointment.cliente?.nome}</span></p>
          <p className="text-gray-400 mb-6">Serviço: <span className="text-white font-medium">{appointment.servico?.nome}</span></p>
          
          <label className="text-sm font-medium text-gray-400 mb-2 block">Novo Status</label>
          <select 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 mb-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="py-2 px-5 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors">Cancelar</button>
            <button onClick={handleSave} className="py-2 px-5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Salvar Alterações</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}