


import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import RevenueChart from '../../components/RevenueChart';
import AppointmentsList from '../../components/AppointmentsList';
import { Users, Calendar, DollarSign, TrendingUp, Clock, Star, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import usePainelDashboard from '../../hooks/usePainelDashboard';
import { useAuth } from '../../context/AuthContext';



export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const { auth } = useAuth();
  const token = auth?.token;
  const { data, loading, error } = usePainelDashboard(token);

  // Exemplo de mapeamento dos dados reais para os cards (ajuste conforme o retorno da API)
  const stats = data ? [
    {
      title: 'Faturamento Hoje',
      value: data.faturamentoHoje ? `R$ ${data.faturamentoHoje}` : '-',
      change: data.faturamentoChange || '+0%',
      trend: data.faturamentoTrend || 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Agendamentos Hoje',
      value: data.agendamentosHoje || '-',
      change: data.agendamentosChange || '+0%',
      trend: data.agendamentosTrend || 'up',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Clientes Ativos',
      value: data.clientesAtivos || '-',
      change: data.clientesChange || '+0%',
      trend: data.clientesTrend || 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Avaliação Média',
      value: data.avaliacaoMedia || '-',
      change: data.avaliacaoChange || '+0',
      trend: data.avaliacaoTrend || 'up',
      icon: Star,
      color: 'yellow'
    }
  ] : [];

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
    <div className="h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-16'}`}>
        <Header />
        <main className="space-y-6 p-6">
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
              <RevenueChart data={data?.graficoReceita} />
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
                <h3 className="text-lg font-semibold text-white mb-4">Performance Hoje</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-gray-300">Tempo Médio</span>
                    </div>
                    <span className="text-white font-medium">{data?.tempoMedio || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300">Taxa Ocupação</span>
                    </div>
                    <span className="text-white font-medium">{data?.taxaOcupacao || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Scissors className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">Serviços Realizados</span>
                    </div>
                    <span className="text-white font-medium">{data?.servicosRealizados || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Top Services */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Serviços Populares</h3>
                <div className="space-y-3">
                  {data?.servicosPopulares?.map((servico, idx) => (
                    <div key={servico.nome + idx} className="flex justify-between items-center">
                      <span className="text-gray-300">{servico.nome}</span>
                      <span className="text-amber-400 font-medium">R$ {servico.valor}</span>
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
            <AppointmentsList data={data?.agendamentosRecentes} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}