import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      await axios.post("https://api-bairro.onrender.com/user/forgot-password", { email });
      setMensagem("Se o email estiver cadastrado, você receberá instruções.");
    } catch (error) {
      setMensagem("Erro ao solicitar recuperação de senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Recuperar Senha
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="w-full px-4 py-3 border rounded-xl"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-xl"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
        {mensagem && <p className="text-center mt-4 text-sm text-gray-700">{mensagem}</p>}
        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-purple-600 hover:underline">
            Voltar ao Login
          </Link>
        </p>
      </div>
    </div>
  );
}
