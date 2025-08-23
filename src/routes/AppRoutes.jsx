import { Routes, Route, Navigate } from "react-router-dom";
import Home from  "../pages/HomePage/Home";
import Login from "../pages/LoginPage/Login";
import Dashboard from "../pages/AdminDashboardPage/Dashboard";
import Servicos from "../pages/AdminDashboardPage/Servicos";
import Horarios from "../pages/AdminDashboardPage/Horarios";
import { useAuth } from "../context/AuthContext";
import Register from "../pages/registerPage/Register";
import ForgotPassword from "../pages/ForgotPasswordPage/ForgotPassword";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/home"
          element={
            <Home />
          }
        />
        <Route
          path="/register"
          element={
              <Register />
          }
        />
        <Route
          path="/forgot-password"
          element={
              <ForgotPassword />
          }
        />
        {/* Rotas privadas */}
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
