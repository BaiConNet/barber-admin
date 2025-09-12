import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmEmail() {
  const [status, setStatus] = useState("validando");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("erro");
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/user/confirm-email?token=${token}`)
      .then(() => {
        setStatus("sucesso");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => setStatus("erro"));
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 px-4">
      <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        {status === "validando" && <p>Confirmando seu e-mail...</p>}
        {status === "sucesso" && <p className="text-green-600">✅ E-mail confirmado com sucesso! Redirecionando...</p>}
        {status === "erro" && <p className="text-red-600">❌ Link inválido ou expirado.</p>}
      </div>
    </div>
  );
}
