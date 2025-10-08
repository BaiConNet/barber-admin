import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email, senha }
      );

      if (data.user.role !== "BARBEIRO" && data.user.role !== "ADMIN") {
        setErro("Acesso permitido apenas para barbeiros ou administradores.");
        return;
      }

      login({ token: data.token, user: data.user });
      setSenha(""); // limpa senha
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setErro(error.response.data.message || "Email ou senha inválidos");
      } else {
        setErro("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 px-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
          Barber Admin
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {erro && (
            <p className="text-center text-red-500 text-sm font-medium bg-red-100 py-2 rounded-md">
              {erro}
            </p>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Links extras */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between text-sm gap-2 sm:gap-0 text-center">
          <Link to="/forgot-password" className="text-purple-600 hover:underline">
            Esqueci minha senha
          </Link>
          <Link to="/register" className="text-purple-600 hover:underline">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
