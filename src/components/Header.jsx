import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, User, Menu } from "lucide-react";

const pageNames = {
  dashboard: "Dashboard",
  appointments: "Agendamentos",
  clients: "Clientes",
  services: "Serviços",
  analytics: "Relatórios",
  settings: "Configurações",
};

export default function Header({ sidebarOpen, setSidebarOpen, currentPage, subTitle  }) {
  return (
    <motion.header
      className="bg-gray-800 border-b border-gray-700 px-6 py-2"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white">
              {pageNames[currentPage] || "Dashboard"}
            </h2>
              {/* Subtítulo dinâmico */}
              {subTitle && (
                <p className="text-gray-400 text-sm mt-1">
                  {subTitle}
                </p>
              )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">João Silva</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}