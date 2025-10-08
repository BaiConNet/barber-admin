import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from '../../components/Logo';
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
        setLoading(false); // Adicionado para parar o loading em caso de erro de role
        return;
      }

      login({ token: data.token, user: data.user });
      setSenha("");
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
    // MUDANÇA 1: Trocamos o gradiente vibrante pelo fundo da Home
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 px-4 text-white">
      
      {/* Adicionamos o logo clicável que leva para a Home */}
      <div className="mb-8">
        <Link to="/home" aria-label="Voltar para a página inicial da JWT House">
          <Logo />
        </Link>
      </div>

      {/* MUDANÇA 2: Trocamos o card branco pelo card de "vidro fosco" escuro */}
      <div className="w-full max-w-md p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6 sm:mb-8">
          Barber Admin
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {erro && (
            <p className="text-center text-red-400 text-sm font-medium bg-red-500/10 py-2 rounded-md border border-red-500/30">
              {erro}
            </p>
          )}

          {/* MUDANÇA 3: Pequenos ajustes de estilo nos inputs para o tema escuro */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* MUDANÇA 4: Ajuste de cor do botão para combinar com a Home */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-amber-400 text-slate-900 font-bold rounded-xl shadow-md hover:bg-amber-500 transition duration-300 flex items-center justify-center disabled:bg-amber-400/50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between text-sm gap-2 sm:gap-0 text-center">
          <Link to="/forgot-password" className="text-slate-300 hover:underline hover:text-white">
            Esqueci minha senha
          </Link>
          <Link to="/register" className="text-slate-300 hover:underline hover:text-white">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}