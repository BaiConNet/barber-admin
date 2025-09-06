import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage/Home.jsx";
import Login from "../pages/LoginPage/Login.jsx";
import Dashboard from "../pages/AdminDashboardPage/Dashboard.jsx";
import Servicos from "../pages/AdminDashboardPage/Servicos.jsx";
import Horarios from "../pages/AdminDashboardPage/Horarios.jsx";
import Appointments from "../pages/AppointmentsPage/Appointments.jsx"
import Register from "../pages/registerPage/Register.jsx";
import ForgotPassword from "../pages/ForgotPasswordPage/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPasswordPage/ResetPassword.jsx";
import PrivateLayout from "../components/PrivateLayout.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";

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
        path="/Agendamentos"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <Appointments />
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
            <PrivateLayout>
              <Horarios />
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}