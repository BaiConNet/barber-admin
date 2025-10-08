import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from '../../components/Logo'; // Importe o Logo
import { Eye, EyeOff, Loader2, HelpCircle } from "lucide-react";
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();

  // --- TODA A SUA LÓGICA DE ESTADO E VALIDAÇÃO FOI 100% PRESERVADA ---
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    role: "BARBEIRO",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    telefone: false,
    senha: false,
  });
  const [senhaValida, setSenhaValida] = useState({
    maiuscula: false,
    minuscula: false,
    numero: false,
    comprimento: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valor = value;
    if (name === "telefone") valor = valor.replace(/\D/g, "").slice(0, 11);
    setForm({ ...form, [name]: valor });
    if (name === "senha") {
      setSenhaValida({
        maiuscula: /[A-Z]/.test(valor),
        minuscula: /[a-z]/.test(valor),
        numero: /\d/.test(valor),
        comprimento: valor.length >= 8,
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validarCampo = (name) => {
    const valor = form[name];
    if (name === "nome") return valor.trim().split(" ").length >= 2;
    if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    if (name === "telefone") return valor.length === 11;
    if (name === "senha") return Object.values(senhaValida).every(Boolean);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.keys(touched).every(key => validarCampo(key));
    if (!isFormValid) {
      setErro("Por favor, preencha todos os campos corretamente.");
      // Marca todos os campos como "tocados" para exibir os erros
      setTouched({ nome: true, email: true, telefone: true, senha: true });
      return;
    }
    setErro("");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, form);
      toast.success('Conta criada com sucesso! Por favor, faça o login.');
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setErro(error.response.data.message || "Erro ao registrar");
      } else {
        setErro("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };
  // --- FIM DA SUA LÓGICA PRESERVADA ---

  return (
    // MUDANÇA 1: Aplicando o novo layout e fundo
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 px-4 text-white">
      <div className="mb-8">
        <Link to="/home" aria-label="Voltar para a página inicial da JWT House">
          <Logo />
        </Link>
      </div>

      <div className="w-full max-w-md p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6">
          Criar Conta
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {erro && (
            <p className="text-center text-red-400 text-sm font-medium bg-red-500/10 py-2 rounded-md border border-red-500/30">
              {erro}
            </p>
          )}

          {/* MUDANÇA 2: Aplicando o novo estilo aos inputs, mantendo a lógica de validação */}
          <div>
            <input
              type="text" name="nome" value={form.nome} onChange={handleChange} onBlur={handleBlur} placeholder="Nome completo" required
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
                touched.nome && !validarCampo("nome") ? "border-red-500 text-red-400" : "border-slate-600"
              }`}
            />
            {touched.nome && !validarCampo("nome") && (
              <p className="text-red-400 text-xs mt-1 pl-1">Informe nome e sobrenome.</p>
            )}
          </div>

          <div>
            <input
              type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email" required
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
                touched.email && !validarCampo("email") ? "border-red-500 text-red-400" : "border-slate-600"
              }`}
            />
            {touched.email && !validarCampo("email") && (
              <p className="text-red-400 text-xs mt-1 pl-1">Informe um email válido.</p>
            )}
          </div>

          <div>
            <input
              type="text" name="telefone" value={form.telefone} onChange={handleChange} onBlur={handleBlur} placeholder="Telefone (somente números)" maxLength="11" required
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
                touched.telefone && !validarCampo("telefone") ? "border-red-500 text-red-400" : "border-slate-600"
              }`}
            />
            {touched.telefone && !validarCampo("telefone") && (
              <p className="text-red-400 text-xs mt-1 pl-1">Telefone deve ter 11 dígitos.</p>
            )}
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"} name="senha" value={form.senha} onChange={handleChange} onBlur={handleBlur} placeholder="Senha" required
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
                touched.senha && !validarCampo("senha") ? "border-red-500 text-red-400" : "border-slate-600"
              }`}
            />
            <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white">
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {touched.senha && !validarCampo("senha") && (
            <div className="text-slate-400 flex items-center gap-2 text-xs pl-1">
              <HelpCircle size={16} className="text-slate-500" />
              <span>Mín 8 caracteres, com maiúscula, minúscula e número.</span>
            </div>
          )}
          
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-amber-400 text-slate-900 font-bold rounded-xl shadow-md hover:bg-amber-500 transition duration-300 flex items-center justify-center disabled:bg-amber-400/50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Registrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-300">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-amber-400 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}