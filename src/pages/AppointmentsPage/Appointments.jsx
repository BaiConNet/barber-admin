import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter, Search, Clock, User } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";

const Appointments = () => {
  const { auth } = useAuth();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchClient, setSearchClient] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const statusConfig = {
    AGENDADO: {
      label: "Agendado",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    CONCLUIDO: {
      label: "Concluído",
      color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    },
    CANCELADO: {
      label: "Cancelado",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  // Função para listar agendamentos
  const listarAgendamentos = async () => {
    try {
      setLoading(true);

      const dateUTC = new Date(selectedDate);
      const isoDate = dateUTC.toISOString().split("T")[0];

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/agendamento?data=${isoDate}`,
        config
      );
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar agendamentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listarAgendamentos();
  }, [selectedDate]);

  // Cancelar agendamento
  const cancelarAgendamento = async (id) => {
    if (!window.confirm("Deseja realmente cancelar este agendamento?")) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/agendamento/${id}/cancelar`,
        {},
        config
      );
      listarAgendamentos();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.message || "Erro ao cancelar agendamento");
    }
  };

  const filteredAppointments = appointments.filter(
    (a) =>
      (filterStatus === "all" || a.status === filterStatus) &&
      (!searchClient ||
        (a.cliente?.nome || "")
          .toLowerCase()
          .includes(searchClient.toLowerCase()))
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-gray-400">
            Gerencie todos os agendamentos da barbearia
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Data
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
            >
              <option value="all">Todos</option>
              <option value="AGENDADO">Agendado</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar Cliente
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
                placeholder="Nome do cliente..."
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              onClick={listarAgendamentos}
            >
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            Agendamentos do Dia
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {filteredAppointments.length} agendamentos encontrados
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment._id}
                className="bg-gray-700/50 rounded-lg border border-gray-600 p-4 hover:border-gray-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Lado esquerdo */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h4 className="text-white font-medium">
                        {appointment?.cliente?.nome || "Cliente desconhecido"}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400 mt-1">
                        <span>
                          {appointment?.servico?.nome || "Serviço não informado"}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment?.horario?.horaInicio || "--:--"}</span>
                        </div>
                        <span className="text-amber-400 font-medium">
                          R$ {appointment?.servico?.preco || "0,00"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lado direito */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border text-center ${
                        statusConfig[appointment.status].color
                      }`}
                    >
                      {statusConfig[appointment.status].label}
                    </span>

                    {/* Botão de cancelar só aparece se status NÃO for CANCELADO */}
                    {appointment.status !== "CANCELADO" && (
                      <button
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => cancelarAgendamento(appointment._id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {erro && <p className="text-red-500 mt-4">{erro}</p>}
    </div>
  );
};

export default Appointments;
