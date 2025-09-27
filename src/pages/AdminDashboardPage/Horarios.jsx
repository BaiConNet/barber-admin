import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { PlusCircle, Trash2, Edit3, X } from "lucide-react";

export default function Horarios() {
  const { auth } = useAuth();
  const [horarios, setHorarios] = useState([]);
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [filtroDia, setFiltroDia] = useState("todos");

  // Modal de edição
  const [modalAberto, setModalAberto] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [novoInicio, setNovoInicio] = useState("");
  const [novoFim, setNovoFim] = useState("");

  const fetchHorarios = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/schedule/barbeiro/${auth.user._id}`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setHorarios(res.data);
    } catch (error) {
      console.error("Erro ao carregar horários:", error);
    }
  };

  const criarHorario = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/schedule`,
        { data, horaInicio, horaFim },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setData(""); setHoraInicio(""); setHoraFim("");
      fetchHorarios();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao criar horário.");
    } finally {
      setLoading(false);
    }
  };

  const excluirHorario = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este horário?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/schedule/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchHorarios();
    } catch (error) {
      alert("Erro ao excluir horário.");
    }
  };

  const toggleDisponibilidade = async (id, atual) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/schedule/${id}`,
        { isDisponivel: !atual },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchHorarios();
    } catch (error) {
      alert("Erro ao atualizar disponibilidade.");
    }
  };

  // Abrir modal de edição
  const abrirModal = (h) => {
    setHorarioSelecionado(h);
    setNovoInicio(h.horaInicio);
    setNovoFim(h.horaFim);
    setModalAberto(true);
  };

  // Salvar alterações
  const salvarAlteracao = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/schedule/${horarioSelecionado._id}`,
        { horaInicio: novoInicio, horaFim: novoFim },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setModalAberto(false);
      fetchHorarios();
    } catch (error) {
      alert("Erro ao alterar horário.");
    }
  };

  useEffect(() => {
    if (auth?.user?._id) fetchHorarios();
  }, [auth]);

  const diasSemana = [
    "todos",
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const diaDaSemana = (dataStr) => {
    const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    const d = new Date(Date.UTC(ano, mes - 1, dia));
    return dias[d.getUTCDay()];
  }

  const horariosFiltrados = horarios.filter((h) => {
    if (filtro === "disponivel" && !h.isDisponivel) return false;
    if (filtro === "indisponivel" && h.isDisponivel) return false;

    const dataStr = new Date(h.data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
    const diaSemanaAtual = diaDaSemana(dataStr);

    if (filtroDia  !== "todos" && filtroDia !== diaSemanaAtual) return false;

    return true;
  });

  const horariosPorData = horariosFiltrados.reduce((acc, h) => {
    const utcDate = new Date(h.data);
    const dataStr = utcDate.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    if (!acc[dataStr]) acc[dataStr] = [];
    acc[dataStr].push(h);
    return acc;
  }, {});

  return (
    <div className="p-3 sm:p-6 bg-barber-card min-h-screen text-gray-100 overflow-x-hidden">
      {/* Formulário */}
      <form
        onSubmit={criarHorario}
        className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:flex-wrap gap-4"
      >
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-xs sm:text-sm font-medium text-gray-300">
            Data
          </label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full text-sm"
          />
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-xs sm:text-sm font-medium text-gray-300">
            Hora Início
          </label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            required
            className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full text-sm"
          />
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-xs sm:text-sm font-medium text-gray-300">
            Hora Fim
          </label>
          <input
            type="time"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            required
            className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition w-full sm:w-auto text-sm"
        >
          <PlusCircle size={16} /> {loading ? "Salvando..." : "Adicionar"}
        </button>
      </form>

      {/* Filtros */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {/* Filtro de disponibilidade */}
        <div className="flex flex-wrap gap-2">
          {["todos", "disponivel", "indisponivel"].map((status) => {
            const colors = {
              todos: "bg-indigo-600 text-white",
              disponivel: "bg-green-600 text-white",
              indisponivel: "bg-red-600 text-white",
            };
            return (
              <button
                key={status}
                onClick={() => setFiltro(status)}
                className={`px-3 py-1 rounded text-xs sm:text-sm ${
                  filtro === status
                    ? colors[status]
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {status === "todos"
                  ? "Todos"
                  : status === "disponivel"
                  ? "Disponíveis"
                  : "Indisponíveis"}
              </button>
            );
          })}
        </div>

        {/* Filtro por dia da semana */}
        <select
          value={filtroDia}
          onChange={(e) => setFiltroDia(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded text-xs sm:text-sm border border-gray-600 w-full sm:w-auto"
        >
          {diasSemana.map((dia) => (
            <option key={dia} value={dia}>
              {dia === "todos" ? "Todos os dias" : dia}
            </option>
          ))}
        </select>
      </div>

      {/* Lista em colunas */}
      <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-4">
        {Object.keys(horariosPorData).length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum horário encontrado.</p>
        ) : (
          Object.entries(horariosPorData).map(([data, lista]) => (
            <div
              key={data}
              className="bg-gray-700 p-4 rounded-lg shadow-md w-full sm:flex-1 sm:min-w-[48%] md:min-w-[30%]"
            >
              <h4 className="text-gray-300 text-sm sm:text-base font-semibold flex justify-between items-center">
                <span>{diaDaSemana(data)}</span>
                <span
                  className={`w-3 h-3 rounded-full ${
                    lista.some((h) => h.isDisponivel)
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  title={
                    lista.some((h) => h.isDisponivel)
                      ? "Disponível"
                      : "Indisponível"
                  }
                />
              </h4>
              <h3 className="font-bold text-xs sm:text-sm mb-2">📅 {data}</h3>
              <ul className="divide-y divide-gray-600">
                {lista
                  .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                  .map((h) => (
                    <li
                      key={h._id}
                      className="flex justify-between items-center py-2 gap-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={h.isDisponivel}
                          onChange={() =>
                            toggleDisponibilidade(h._id, h.isDisponivel)
                          }
                          className="w-4 h-4 accent-green-600"
                        />
                        <span>
                          {h.horaInicio} - {h.horaFim}
                        </span>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() => abrirModal(h)}
                          className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => excluirHorario(h._id)}
                          className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        )}
      </div>
      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-2">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-xs relative">
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Editar Horário
            </h2>
            <div className="flex flex-col gap-3">
              <label className="text-xs sm:text-sm font-medium text-gray-300">
                Hora Início
              </label>
              <input
                type="time"
                value={novoInicio}
                onChange={(e) => setNovoInicio(e.target.value)}
                className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full text-sm"
              />
              <label className="text-xs sm:text-sm font-medium text-gray-300">
                Hora Fim
              </label>
              <input
                type="time"
                value={novoFim}
                onChange={(e) => setNovoFim(e.target.value)}
                className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full text-sm"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white w-full sm:w-auto text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={salvarAlteracao}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto text-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
