import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, HelpCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
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
    if (name === "senha")
      return Object.values(senhaValida).every(Boolean);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.keys(form).every(validarCampo)) {
      setErro("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, form);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-400 px-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
          Criar Conta
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {erro && (
            <p className="text-center text-red-500 text-sm font-medium bg-red-100 py-2 rounded-md">
              {erro}
            </p>
          )}

          {/* Nome */}
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Nome completo"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              touched.nome && !validarCampo("nome") ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {touched.nome && !validarCampo("nome") && (
            <p className="text-red-500 text-sm">Informe nome e sobrenome.</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              touched.email && !validarCampo("email") ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {touched.email && !validarCampo("email") && (
            <p className="text-red-500 text-sm">Informe um email válido.</p>
          )}

          {/* Telefone */}
          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Telefone (somente números)"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              touched.telefone && !validarCampo("telefone") ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {touched.telefone && !validarCampo("telefone") && (
            <p className="text-red-500 text-sm">Telefone deve ter 11 dígitos.</p>
          )}

          {/* Senha */}
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              value={form.senha}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Senha"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                touched.senha && !validarCampo("senha") ? "border-red-500" : "border-gray-300"
              }`}
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
          {!validarCampo("senha") && touched.senha && (
            <div className="right-10 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center gap-1">
              <HelpCircle size={18} />
              <span className="text-xs text-gray-700 bg-gray-200 rounded px-1 py-0.5">
                Mín 8 caracteres, maiúscula, minúscula e número
              </span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Registrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Já tem conta?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
