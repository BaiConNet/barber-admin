import React, { useState, useMemo, useCallback } from "react";
import axios from "axios";
import StatsCard from "../../components/StatsCard.jsx";
import RevenueChart from "../../components/RevenueChart.jsx";
import AppointmentsList from "../../components/AppointmentsList.jsx";
import EditStatusModal from "../../components/EditStatusModal.jsx";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  Scissors,
} from "lucide-react";
import { motion } from "framer-motion";
import usePainelDashboard from "../../hooks/usePainelDashboard.js";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const mesesAbreviados = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export default function Dashboard() {
  const { auth } = useAuth();
  const token = auth?.token;
  const { data, setData, loading, error } = usePainelDashboard(token);

  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleUpdateStatus = useCallback(async (id, novoStatus) => {
    try {
      await axios.patch(
        `${API_URL}/agendamento/${id}/status`,
        { status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedAppointments = data.agendamentos.map((apt) =>
        apt._id === id ? { ...apt, status: novoStatus } : apt
      );
      setData({ ...data, agendamentos: updatedAppointments });
      setEditingAppointment(null);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }, [token, data, setData]);

  const handleCancelAppointment = useCallback(async (id) => {
    try {
      await axios.put(
        `${API_URL}/agendamento/${id}/cancelar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedAppointments = data.agendamentos.map((apt) =>
        apt._id === id ? { ...apt, status: "CANCELADO" } : apt
      );
      setData({ ...data, agendamentos: updatedAppointments });
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
    }
  }, [token, data, setData]);

  const handleRemoveAppointment = useCallback((id) => {
    if (!data) return;
    const updatedAppointments = data.agendamentos.filter(
      (apt) => apt._id !== id
    );
    setData({ ...data, agendamentos: updatedAppointments });
  }, [data, setData]);

  const processed = useMemo(() => {
    if (!data) {
      return {
        faturamentoHoje: 0, agendamentosHoje: 0, clientesAtivos: 0, avaliacaoMedia: 0,
        graficoReceita: [], tempoMedio: "0min", taxaOcupacao: "0%", servicosRealizados: 0,
        servicosPopulares: [], agendamentosRecentes: [],
      };
    }
    const hoje = new Date().toISOString().slice(0, 10);
    const agendamentosHoje = data.agendamentos?.filter(a => a.criadoEm && new Date(a.criadoEm).toISOString().slice(0, 10) === hoje && a.status !== "CANCELADO") || [];
    const agendamentosConcluidosHoje = agendamentosHoje.filter(a => a.status === "CONCLUIDO");
    const faturamentoHoje = agendamentosConcluidosHoje.reduce((acc, ag) => acc + (ag.servico?.preco || 0), 0);
    const receitaPorMes = data.agendamentos?.filter(a => a.status === "CONCLUIDO" && a.criadoEm).reduce((acc, a) => {
        const date = new Date(a.criadoEm);
        const mesAno = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        acc[mesAno] = (acc[mesAno] || 0) + (a.servico?.preco || 0);
        return acc;
      }, {}) || {};
    const graficoReceita = Object.entries(receitaPorMes).sort((a, b) => {
        const [mesA, anoA] = a[0].split('/');
        const [mesB, anoB] = b[0].split('/');
        return new Date(`${anoA}-${mesA}-01`) - new Date(`${anoB}-${mesB}-01`);
      }).map(([mesAno, total]) => {
        const mesNumero = parseInt(mesAno.split('/')[0], 10);
        const nomeMesAbreviado = mesesAbreviados[mesNumero - 1];
        return {
          name: nomeMesAbreviado,
          receita: total,
          agendamentos: data.agendamentos?.filter(ag => ag.status === "CONCLUIDO" && ag.data && `${String(new Date(ag.data).getMonth() + 1).padStart(2, "0")}/${new Date(ag.data).getFullYear()}` === mesAno).length || 0,
        };
      });
    const agendamentosRecentes = data.agendamentos?.sort((a, b) => new Date(b.data) - new Date(a.criadoEm)).slice(0, 5) || [];
    return {
      faturamentoHoje, agendamentosHoje: agendamentosHoje.length, clientesAtivos: data.clientes?.length || 0,
      avaliacaoMedia: 4.8, graficoReceita, tempoMedio: "45min", taxaOcupacao: "80%",
      servicosRealizados: agendamentosConcluidosHoje.length,
      servicosPopulares: data.servicos?.slice(0, 3) || [], agendamentosRecentes,
    };
  }, [data]);

  const stats = [
    { title: "Faturamento Hoje", value: `R$ ${processed.faturamentoHoje.toFixed(2)}`, icon: DollarSign, color: "green" },
    { title: "Agendamentos Hoje", value: processed.agendamentosHoje, icon: Calendar, color: "blue" },
    { title: "Clientes Ativos", value: processed.clientesAtivos, icon: Users, color: "purple" },
    { title: "Avaliação Média", value: processed.avaliacaoMedia, icon: Star, color: "yellow" },
  ];

  if (loading) { return <div className="flex h-screen items-center justify-center bg-gray-900"><span className="text-lg text-gray-400">Carregando painel...</span></div>; }
  if (error) { return <div className="flex h-screen items-center justify-center bg-gray-900"><span className="text-lg text-red-400">Erro ao carregar painel</span></div>; }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <RevenueChart data={processed.graficoReceita} />
        </motion.div>

        <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Performance Hoje</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Tempo Médio</span>
                </div>
                <span className="font-medium text-white">{processed.tempoMedio}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">Taxa Ocupação</span>
                </div>
                <span className="font-medium text-white">{processed.taxaOcupacao}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                    <Scissors className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">Serviços Realizados</span>
                </div>
                <span className="font-medium text-white">{processed.servicosRealizados}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Serviços Populares</h3>
            <div className="space-y-3">
              {processed.servicosPopulares.map((servico) => (
                <div key={servico._id} className="flex items-center justify-between">
                  <span className="text-gray-300">{servico.nome}</span>
                  <span className="font-medium text-amber-400">R$ {servico.preco.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
        <AppointmentsList
          appointments={processed.agendamentosRecentes}
          onCancel={handleCancelAppointment}
          onRemove={handleRemoveAppointment}
          onEdit={(appointment) => setEditingAppointment(appointment)}
        />
      </motion.div>

      {editingAppointment && (
        <EditStatusModal
          appointment={editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onSave={handleUpdateStatus}
        />
      )}
    </div>
  );
}