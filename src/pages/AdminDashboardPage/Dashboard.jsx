

import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import RevenueChart from '../../components/RevenueChart';
import AppointmentsList from '../../components/AppointmentsList';
import { Users, Calendar, DollarSign, TrendingUp, Clock, Star, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';


export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const stats = [
    {
      title: 'Faturamento Hoje',
      value: 'R$ 1.250,00',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Agendamentos Hoje',
      value: '18',
      change: '+5%',
      trend: 'up',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Clientes Ativos',
      value: '342',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Avaliação Média',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    }
  ];

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
              <RevenueChart />
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
                    <span className="text-white font-medium">45min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300">Taxa Ocupação</span>
                    </div>
                    <span className="text-white font-medium">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Scissors className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">Serviços Realizados</span>
                    </div>
                    <span className="text-white font-medium">23</span>
                  </div>
                </div>
              </div>

              {/* Top Services */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Serviços Populares</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Corte + Barba</span>
                    <span className="text-amber-400 font-medium">R$ 45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Corte Simples</span>
                    <span className="text-amber-400 font-medium">R$ 25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Barba</span>
                    <span className="text-amber-400 font-medium">R$ 20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sobrancelha</span>
                    <span className="text-amber-400 font-medium">R$ 15</span>
                  </div>
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
            <AppointmentsList />
          </motion.div>
        </main>
      </div>
    </div>
  );
}