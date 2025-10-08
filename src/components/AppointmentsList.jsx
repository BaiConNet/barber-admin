
import React from "react";

const AppointmentsList = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Próximos Agendamentos</h2>
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Próximos Agendamentos</h2>
      <ul>
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
          >
            <div>
              <span className="font-medium">{appointment.cliente}</span> - {appointment.servico}
            </div>
            <div>
              <span className="text-sm text-gray-500 mr-2">{appointment.horario}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  appointment.status === "Confirmado"
                    ? "bg-green-100 text-green-700"
                    : appointment.status === "Pendente"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {appointment.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;

