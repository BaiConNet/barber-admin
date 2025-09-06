import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErro("");
  setLoading(true);

  try {
    const { data } = await axios.post(
      "https://api-bairro.onrender.com/user/login",
      { email, senha }
    );

    if (data.user.role !== "BARBEIRO" && data.user.role !== "ADMIN") {
      setErro("Acesso permitido apenas para barbeiros ou administradores.");
      return;
    }

    login({ token: data.token, user: data.user });

    // Limpa a senha do estado
    setSenha("");

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Barber Admin
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {erro && (
            <p className="text-center text-red-500 text-sm font-medium">{erro}</p>
          )}
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
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-300"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Links extras */}
        <div className="mt-6 flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-purple-600 hover:underline"
          >
            Esqueci minha senha
          </Link>
          <Link
            to="/register"
            className="text-purple-600 hover:underline"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
