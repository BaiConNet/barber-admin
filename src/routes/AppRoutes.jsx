import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import Dashboard from "../pages/AdminDashboardPage/Dashboard";
import Servicos from "../pages/AdminDashboardPage/Servicos";
import Horarios from "../pages/AdminDashboardPage/Horarios";
import Register from "../pages/registerPage/Register";
import ForgotPassword from "../pages/ForgotPasswordPage/ForgotPassword";
import ResetPassword from "../pages/ResetPasswordPage/ResetPassword";
import PrivateLayout from "../components/PrivateLayout";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Rotas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <PrivateLayout currentPage="dashboard">
              <Dashboard />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/servicos"
        element={
          <PrivateRoute>
            <PrivateLayout currentPage="services">
              <Servicos />
            </PrivateLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/horarios"
        element={
          <PrivateRoute>
            <PrivateLayout  currentPage="appointments">
              <Horarios />
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
