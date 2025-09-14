import React, { useState, useMemo } from "react";
import StatsCard from "../../components/StatsCard.jsx";
import RevenueChart from "../../components/RevenueChart.jsx";
import AppointmentsList from "../../components/AppointmentsList.jsx";
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

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const { auth } = useAuth();
  const token = auth?.token;
  const { data, loading, error } = usePainelDashboard(token);

  // Processa os dados vindos da API para o formato esperado pelo Dashboard
  const processed = useMemo(() => {
    if (!data) return {};

    const hoje = new Date().toISOString().slice(0, 10);

    // Agendamentos de hoje
    const agendamentosHoje = data.agendamentos?.filter(a =>
      a.criadoEm?.startsWith(hoje)
    ) || [];

    // Faturamento de hoje (somando os valores dos serviços dos agendamentos)
    const faturamentoHoje = agendamentosHoje.reduce((acc, ag) => {
      acc += Number(ag.servico?.preco || 0);
      return acc;
    }, 0);

    // Receita mensal (MM/YYYY)
    const receitaPorMes = {};
    data.agendamentos?.forEach(a => {
      if (!a.criadoEm) return;
      const date = new Date(a.criadoEm);
      const mesAno = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
      const valor = Number(a.servico?.preco || 0);
      receitaPorMes[mesAno] = (receitaPorMes[mesAno] || 0) + valor;
    });

    const graficoReceita = Object.entries(receitaPorMes)
      .sort(([mesA], [mesB]) => new Date(`01/${mesA}`) - new Date(`01/${mesB}`))
      .map(([mes, valor]) => ({ dia: mes, valor }));

    return {
      faturamentoHoje,
      agendamentosHoje: agendamentosHoje.length,
      clientesAtivos: data.clientes?.length || 0,
      avaliacaoMedia: 4.8, // mock, ajuste quando tiver feedbacks
      graficoReceita,
      tempoMedio: "45min", // mock
      taxaOcupacao: "80%", // mock
      servicosRealizados: data.servicos?.length || 0,
      servicosPopulares: data.servicos?.slice(0, 3).map(s => ({
        nome: s.nome,
        valor: s.preco,
      })) || [],
      agendamentosRecentes: data.agendamentos?.slice(-5) || [],
    };
  }, [data]);

  const stats = [
    {
      title: "Faturamento Hoje",
      value: processed.faturamentoHoje
        ? `R$ ${processed.faturamentoHoje}`
        : "-",
      change: "+0%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Agendamentos Hoje",
      value: processed.agendamentosHoje || "-",
      change: "+0%",
      trend: "up",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Clientes Ativos",
      value: processed.clientesAtivos || "-",
      change: "+0%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      title: "Avaliação Média",
      value: processed.avaliacaoMedia || "-",
      change: "+0",
      trend: "up",
      icon: Star,
      color: "yellow",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-400 text-lg">Carregando painel...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-400 text-lg">Erro ao carregar painel</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <RevenueChart data={processed.graficoReceita} />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Today's Performance */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Performance Hoje
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Tempo Médio</span>
                </div>
                <span className="text-white font-medium">
                  {processed.tempoMedio || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">Taxa Ocupação</span>
                </div>
                <span className="text-white font-medium">
                  {processed.taxaOcupacao || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Scissors className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">Serviços Realizados</span>
                </div>
                <span className="text-white font-medium">
                  {processed.servicosRealizados || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Serviços Populares
            </h3>
            <div className="space-y-3">
              {processed.servicosPopulares?.map((servico, idx) => (
                <div
                  key={servico.nome + idx}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-300">{servico.nome}</span>
                  <span className="text-amber-400 font-medium">
                    R$ {servico.valor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <AppointmentsList data={processed.agendamentosRecentes} />
      </motion.div>
    </div>
  );
}
