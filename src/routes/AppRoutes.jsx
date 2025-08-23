import { Routes, Route, Navigate } from "react-router-dom";
import Home from  "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import Dashboard from "../pages/AdminDashboardPage/Dashboard";
import Servicos from "../pages/AdminDashboardPage/Servicos";
import Horarios from "../pages/AdminDashboardPage/Horarios";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/servicos"
          element={
            <PrivateRoute>
              <Servicos />
            </PrivateRoute>
          }
        />
        <Route
          path="/horarios"
          element={
            <PrivateRoute>
              <Horarios />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

  );
}
