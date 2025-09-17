import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useNotifications from "../hooks/useNotifications";

const pageNames = {
  dashboard: "Dashboard",
  appointments: "Agendamentos",
  horarios: "Horarios",
  clients: "Clientes",
  services: "Serviços",
  analytics: "Relatórios",
  settings: "Configurações",
};

export default function Header({ currentPage, subTitle }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { notifications } = useNotifications(auth?.user?._id);

  const [menuOpen, setMenuOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header
      className="bg-gray-800 border-b border-gray-700 px-6 py-2"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Left side: page title + subtitle */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">
            {pageNames[currentPage] || "Dashboard"}
          </h2>
          {subTitle && (
            <p className="text-gray-400 text-sm mt-1">{subTitle}</p>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotiOpen(!notiOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>

            {notiOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-700 border border-gray-600 rounded-lg shadow-lg py-2 z-50 max-h-80 overflow-y-auto">
                {notifications.length === 0 && (
                  <p className="text-gray-300 px-4 py-2">Sem notificações</p>
                )}
                {notifications.map((noti, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 border-b border-gray-600 text-gray-200"
                  >
                    {noti.title && <p className="font-semibold">{noti.title}</p>}
                    <p className="text-sm">{noti.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-3 hover:opacity-80 transition"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">
                  {auth?.user?.nome || "Usuário"}
                </p>
                <p className="text-xs text-gray-400">
                  {auth?.user?.role || "Perfil"}
                </p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
