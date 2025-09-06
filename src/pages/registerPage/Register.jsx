import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    role: "BARBEIRO"
  });
  
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const [senhaValida, setSenhaValida] = useState({
    maiuscula: false,
    minuscula: false,
    numero: false,
    comprimento: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let valor = value;

    if(name === "telefone") {
      valor = valor.replace(/\D/g, "").slice(0, 11);
    }

    setForm({ ...form, [name]: valor });

  if (name === "senha") {
      const regexMaiuscula = /[A-Z]/.test(value);
      const regexMinuscula = /[a-z]/.test(value);
      const regexNumero = /\d/.test(value);
      const regexComprimento = value.length >= 8;

      setSenhaValida({
        maiuscula: regexMaiuscula,
        minuscula: regexMinuscula,
        numero: regexNumero,
        comprimento: regexComprimento
      });

      // Mensagem de erro
      if (!regexMaiuscula || !regexMinuscula || !regexNumero || !regexComprimento) {
        setErro("Senha não atende aos requisitos.");
      } else {
        setErro("");
      }
    }

  if (name === "nome") {
      const regexNome = /^[A-Za-zÀ-ÿ\s]+$/.test(valor);
      if (!regexNome || valor.trim().length < 30 || valor.trim().length > 30) {
        setErro("O nome deve conter nome e sobrenome.");
      } else {
        setErro("");
      }
    }

  if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
      if (!regexEmail) {
        setErro("Informe um email válido.");
      } else {
        setErro("");
      }
    }

  if (name === "telefone") {
      if (valor.length < 11) {
        setErro("Telefone deve ter 11 dígitos.");
      } else {
        setErro("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (erro) return;
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, form);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Criar Conta
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {erro && <p className="text-red-500 text-center">{erro}</p>}

          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="Telefone (somente números)"
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Senha"
            className="w-full px-4 py-3 border rounded-xl"
          />

          {/* Checklist de senha */}
          <div className="text-sm mt-2 space-y-1">
            <p className={senhaValida.comprimento ? "text-green-600" : "text-red-500"}>
              • Mínimo 8 caracteres
            </p>
            <p className={senhaValida.maiuscula ? "text-green-600" : "text-red-500"}>
              • Contém letra maiúscula
            </p>
            <p className={senhaValida.minuscula ? "text-green-600" : "text-red-500"}>
              • Contém letra minúscula
            </p>
            <p className={senhaValida.numero ? "text-green-600" : "text-red-500"}>
              • Contém número
            </p>
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              erro ||
              !form.senha ||
              !form.nome ||
              !form.email ||
              !form.telefone
            }
            className="w-full py-3 bg-purple-600 text-white rounded-xl"
          >
            {loading ? "Criando..." : "Registrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Já tem conta?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
