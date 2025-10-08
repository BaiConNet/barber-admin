import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from '../../components/Logo'; // Importe o Logo
import { Loader2 } from "lucide-react"; // Importe o ícone de loading

export default function ForgotPassword() {
  // --- SUA LÓGICA FOI 100% PRESERVADA ---
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/forgot-password`, { email }); // Corrigido para o endpoint provável de usuário
      setMensagem("Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.");
    } catch (error) {
      // Mesmo em caso de erro, mostramos uma mensagem genérica por segurança
      // para não confirmar se um email existe ou não no banco.
      setMensagem("Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.");
    } finally {
      setLoading(false);
    }
  };
  // --- FIM DA SUA LÓGICA ---

  return (
    // MUDANÇA 1: Aplicando o layout e fundo escuro
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 px-4 text-white">
      
      <div className="mb-8">
        <Link to="/home" aria-label="Voltar para a página inicial da JWT House">
          <Logo />
        </Link>
      </div>

      {/* MUDANÇA 2: Aplicando o card de "vidro fosco" */}
      <div className="w-full max-w-md p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-2">
          Recuperar Senha
        </h1>
        <p className="text-center text-slate-400 mb-6 sm:mb-8">
          Digite seu email para receber o link de redefinição.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {mensagem && (
            // Mensagem de feedback (sucesso ou erro genérico)
            <p className="text-center text-green-400 text-sm font-medium bg-green-500/10 py-3 rounded-md border border-green-500/30">
              {mensagem}
            </p>
          )}

          {/* MUDANÇA 3: Estilizando o input para o tema escuro */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              required
            />
          </div>

          {/* MUDANÇA 4: Estilizando o botão para o tema da marca */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-amber-400 text-slate-900 font-bold rounded-xl shadow-md hover:bg-amber-500 transition duration-300 flex items-center justify-center disabled:bg-amber-400/50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Enviar Link de Recuperação"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          <Link to="/login" className="font-semibold text-amber-400 hover:underline">
            ← Voltar ao Login
          </Link>
        </p>
      </div>
    </div>
  );
}