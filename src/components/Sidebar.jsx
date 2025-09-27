// src/components/Sidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Scissors, Settings, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'appointments', label: 'Agendamentos', icon: Calendar, path: '/agendamentos' },
  { id: 'horarios', label: 'Horarios', icon: Clock, path: '/horarios' },
  { id: 'services', label: 'Serviços', icon: Scissors, path: '/servicos' },
  { id: 'settings', label: 'Configurações', icon: Settings, path: '/configuracoes' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 z-40 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && (
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Barbearia Elite</h1>
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {isOpen && (
                <motion.span
                  className="ml-3 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400 text-center">
              © 2025 Barbearia Elite
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
