import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
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
