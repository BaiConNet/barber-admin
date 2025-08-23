import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: ""
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await axios.post("https://api-bairro.onrender.com/user/register", form);
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
            placeholder="Nome"
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
            placeholder="Telefone"
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
          <button
            type="submit"
            disabled={loading}
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
