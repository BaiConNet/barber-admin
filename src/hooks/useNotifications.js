import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const SOCKET_URL = import.meta.env.VITE_API_URL;
const API_URL = `${SOCKET_URL}/notificacoes`;

export default function useNotifications(userId, token) {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  // Buscar notificações existentes ao iniciar
  useEffect(() => {
    if (!userId || !token) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data || []);
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
      }
    };

    fetchNotifications();
  }, [userId, token]);

  // Conexão via Socket
  useEffect(() => {
    if (!userId) return;

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);

      socketRef.current.on("connect", () => {
        console.log("Conectado ao socket:", socketRef.current.id);
        socketRef.current.emit("register", userId);
      });

      socketRef.current.on("new_notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  // Função para marcar notificação como lida
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/lida`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((noti) =>
          noti._id === id ? { ...noti, lida: true } : noti
        )
      );
    } catch (err) {
      console.error("Erro ao marcar notificação como lida:", err);
    }
  };

  return { notifications, setNotifications, markAsRead };
}
