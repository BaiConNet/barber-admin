import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
