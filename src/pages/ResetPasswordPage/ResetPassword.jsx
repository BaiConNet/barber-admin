import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams(); // pega o token da URL
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      await axios.post(`https://api-bairro.onrender.com/reset-password/${token}`, {
        senha,
      });

      setMensagem("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMensagem("Erro ao redefinir senha. O link pode estar expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Redefinir Senha
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a nova senha"
            className="w-full px-4 py-3 border rounded-xl"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-xl"
          >
            {loading ? "Enviando..." : "Redefinir"}
          </button>
        </form>
        {mensagem && (
          <p className="text-center mt-4 text-sm text-gray-700">{mensagem}</p>
        )}
        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-green-600 hover:underline">
            Voltar ao Login
          </Link>
        </p>
      </div>
    </div>
  );
}
