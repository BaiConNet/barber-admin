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

  const horariosFiltrados = horarios.filter((h) => {
    if (filtro === "disponivel") return h.isDisponivel;
    if (filtro === "indisponivel") return !h.isDisponivel;
    return true;
  });

  const horariosPorData = horariosFiltrados.reduce((acc, h) => {
    const utcDate = new Date(h.data);
    const dataStr = utcDate.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    if (!acc[dataStr]) acc[dataStr] = [];
    acc[dataStr].push(h);
    return acc;
  }, {});

  const diaDaSemana = (dataStr) => {
    const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const [dia, mes, ano] = dataStr.split("/").map(Number);
    const d = new Date(Date.UTC(ano, mes - 1, dia));
    return dias[d.getUTCDay()];
  }

  return (
    <div className="p-6 bg-barber-card min-h-screen text-gray-100">

      {/* Formulário */}
      <form onSubmit={criarHorario} className="bg-gray-800 p-4 rounded-lg shadow-md flex gap-4 items-end flex-wrap">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300">Data</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600"/>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300">Hora Início</label>
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600"/>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300">Hora Fim</label>
          <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} required className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600"/>
        </div>
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          <PlusCircle size={18}/> {loading ? "Salvando..." : "Adicionar"}
        </button>
      </form>

      {/* Filtro */}
      <div className="mt-6 flex gap-3">
        {["todos","disponivel","indisponivel"].map((status)=>{
          const colors = { todos: "bg-indigo-600 text-white", disponivel: "bg-green-600 text-white", indisponivel: "bg-red-600 text-white" };
          return <button key={status} onClick={()=>setFiltro(status)} className={`px-3 py-1 rounded ${filtro===status?colors[status]:"bg-gray-700 text-gray-300"}`}>
            {status==="todos"?"Todos":status==="disponivel"?"Disponíveis":"Indisponíveis"}
          </button>
        })}
      </div>

      {/* Lista em colunas */}
      <div className="mt-6 flex flex-wrap gap-4">
        {Object.keys(horariosPorData).length === 0 ? (
          <p className="text-gray-400">Nenhum horário encontrado.</p>
        ) : (
          Object.entries(horariosPorData).map(([data, lista]) => (
            <div
              key={data}
              className="bg-gray-700 p-4 rounded-lg shadow-md flex-1 min-w-[220px] sm:min-w-[48%] md:min-w-[30%]"
            >
              <h4 className="text-gray-300 text-base font-semibold">{diaDaSemana(data)}</h4>
              <h3 className="font-bold text-sm mb-2">📅 {data}</h3>
              <ul className="divide-y divide-gray-600">
                {lista
                  .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                  .map((h) => (
                    <li
                      key={h._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 gap-2"
                    >
                      <div>
                        ⏰ {h.horaInicio} - {h.horaFim}{" "}
                        <span
                          className={`ml-0 sm:ml-1 px-1 py-0.5 rounded text-sm ${
                            h.isDisponivel
                              ? "bg-green-700 text-green-100"
                              : "bg-red-700 text-red-100"
                          }`}
                        >
                          {h.isDisponivel ? "Disponível" : "Indisponível"}
                        </span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <button
                          onClick={() => toggleDisponibilidade(h._id, h.isDisponivel)}
                          className={`px-2 py-0.5 rounded text-white text-xs font-medium ${
                            h.isDisponivel
                              ? "bg-yellow-600 hover:bg-yellow-500"
                              : "bg-purple-600 hover:bg-purple-500"
                          }`}
                        >
                          Alternar
                        </button>
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
            <h2 className="text-lg font-semibold mb-4">Editar Horário</h2>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-300">Hora Início</label>
              <input
                type="time"
                value={novoInicio}
                onChange={(e) => setNovoInicio(e.target.value)}
                className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full"
              />
              <label className="text-sm font-medium text-gray-300">Hora Fim</label>
              <input
                type="time"
                value={novoFim}
                onChange={(e) => setNovoFim(e.target.value)}
                className="border rounded px-2 py-1 bg-gray-700 text-white border-gray-600 w-full"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white w-full sm:w-auto"
              >
                Cancelar
              </button>
              <button
                onClick={salvarAlteracao}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto"
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
