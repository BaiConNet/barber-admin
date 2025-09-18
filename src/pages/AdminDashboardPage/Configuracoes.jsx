import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Bell, Shield, Palette, Globe, Save, Camera, Phone, Mail, MapPin } from 'lucide-react';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    newAppointments: true,
    reminders: true,
    marketing: false,
    reports: true
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'schedule', label: 'Horários', icon: Clock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'general', label: 'Geral', icon: Globe }
  ];

  const workingHours = [
    { day: 'Segunda-feira', start: '08:00', end: '18:00', active: true },
    { day: 'Terça-feira', start: '08:00', end: '18:00', active: true },
    { day: 'Quarta-feira', start: '08:00', end: '18:00', active: true },
    { day: 'Quinta-feira', start: '08:00', end: '18:00', active: true },
    { day: 'Sexta-feira', start: '08:00', end: '19:00', active: true },
    { day: 'Sábado', start: '08:00', end: '17:00', active: true },
    { day: 'Domingo', start: '09:00', end: '15:00', active: false }
  ];

  // Função que decide qual conteúdo renderizar com base na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">João Silva</h3>
                <p className="text-gray-400">Proprietário da Barbearia Elite</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
                <input type="text" defaultValue="João Silva" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="email" defaultValue="joao@barbeariaelite.com" className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="tel" defaultValue="(11) 99999-9999" className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Endereço</label>
                <div className="relative"><MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" defaultValue="Rua das Flores, 123 - São Paulo" className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none" /></div>
              </div>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Horários de Funcionamento</h3>
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center space-x-4"><input type="checkbox" defaultChecked={schedule.active} className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" /><span className="text-white font-medium w-32">{schedule.day}</span></div>
                    <div className="flex items-center space-x-4"><input type="time" defaultValue={schedule.start} className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-amber-500 focus:outline-none" /><span className="text-gray-400">até</span><input type="time" defaultValue={schedule.end} className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-amber-500 focus:outline-none" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Preferências de Notificação</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4"><div><h4 className="text-white font-medium">Novos Agendamentos</h4><p className="text-gray-400 text-sm">Receber notificação quando houver novos agendamentos</p></div><input type="checkbox" checked={notifications.newAppointments} onChange={(e) => setNotifications({...notifications, newAppointments: e.target.checked})} className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" /></div>
                <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4"><div><h4 className="text-white font-medium">Lembretes</h4><p className="text-gray-400 text-sm">Receber lembretes de agendamentos próximos</p></div><input type="checkbox" checked={notifications.reminders} onChange={(e) => setNotifications({...notifications, reminders: e.target.checked})} className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" /></div>
                <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4"><div><h4 className="text-white font-medium">Marketing</h4><p className="text-gray-400 text-sm">Receber dicas e novidades sobre marketing</p></div><input type="checkbox" checked={notifications.marketing} onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})} className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" /></div>
                <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4"><div><h4 className="text-white font-medium">Relatórios</h4><p className="text-gray-400 text-sm">Receber relatórios semanais de performance</p></div><input type="checkbox" checked={notifications.reports} onChange={(e) => setNotifications({...notifications, reports: e.target.checked})} className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" /></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Conteúdo em desenvolvimento...</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-gray-400">Gerencie as configurações da sua barbearia</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <motion.button
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-5 h-5" />
                <span>Salvar Alterações</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}