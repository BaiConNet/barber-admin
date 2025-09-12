import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Plus, Edit, Trash2, Clock, DollarSign, TrendingUp, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const Services = () => {
  const { auth } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState({ aberto: false, tipo: 'criar', servico: null });
  const [form, setForm] = useState({ nome: '', duracao: '', preco: '', categoria: '' });
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const categories = ['Todos', ...Array.from(new Set(services.map(s => s.categoria)))];

  const config = {
    headers: { Authorization: `Bearer ${auth?.token}` },
  };

  const listarServicos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/servico`, config);
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setErro('Erro ao carregar serviços');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    listarServicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome: form.nome,
        duracao: Number(form.duracao),
        preco: Number(form.preco),
        categoria: form.categoria,
      };

      if (modal.tipo === 'criar') {
        await axios.post(`${import.meta.env.VITE_API_URL}/servico`, payload, config);
      } else if (modal.tipo === 'editar' && modal.servico) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/servico/${modal.servico._id}`,
          payload,
          config
        );
      }
      setModal({ aberto: false, tipo: 'criar', servico: null });
      setForm({ nome: '', duracao: '', preco: '', categoria: '' });
      listarServicos();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.message || 'Erro ao salvar serviço');
    }
  };

  const excluirServico = async (id) => {
    if (!window.confirm('Deseja realmente excluir este serviço?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/servico/${id}`, config);
      listarServicos();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.message || 'Erro ao excluir serviço');
    }
  };

  const filteredServices = services.filter(
    (s) => selectedCategory === 'Todos' || s.categoria === selectedCategory
  );

  const totalRevenue = services.reduce((acc, s) => acc + (s.preco || 0), 0);
  const averagePrice = services.length
    ? services.reduce((acc, s) => acc + (s.preco || 0), 0) / services.length
    : 0;
  const averageDuration = services.length
    ? services.reduce((acc, s) => acc + (s.duracao || 0), 0) / services.length
    : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header com Novo Serviço + Filtro */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center gap-4">

          {/* Botão Novo Serviço */}
          <motion.button
            onClick={() => setModal({ aberto: true, tipo: 'criar', servico: null })}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 text-xs rounded-md font-medium sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base hover:from-amber-600 hover:to-orange-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            <span>Novo Serviço</span>
          </motion.button>

          {/* Botão Filtrar Por */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm bg-gray-800 font-medium text-white hover:bg-gray-700 focus:outline-none"
            >
              Filtrar Por
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          selectedCategory === category
                            ? 'bg-amber-500 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-400 text-sm">Nenhuma categoria disponível</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{services.length}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Total de Serviços</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">R$ {averagePrice.toFixed(0)}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Preço Médio</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{averageDuration.toFixed(0)}min</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Duração Média</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">R$ {totalRevenue.toFixed(0)}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Receita Estimada</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        {loading ? (
          <p className="text-gray-400 col-span-full text-center">Carregando serviços...</p>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <motion.div
              key={service._id}
              className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Scissors className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{service.nome}</h3>
                    <span className="text-[10px] sm:text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {service.categoria || "Sem Categoria"}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setModal({ aberto: true, tipo: "editar", servico: service });
                      setForm({
                        nome: service.nome,
                        duracao: service.duracao,
                        preco: service.preco,
                        categoria: service.categoria || "",
                      });
                    }}
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 transition-colors"
                    onClick={() => excluirServico(service._id)}
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">Preço</span>
                  </div>
                  <span className="text-green-400 font-bold text-sm sm:text-base">
                    R$ {service.preco}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">Duração</span>
                  </div>
                  <span className="text-blue-400 font-medium text-sm sm:text-base">
                    {service.duracao}min
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">Nenhum serviço cadastrado.</p>
        )}
      </div>

      {/* Modal criar/editar */}
      {modal.aberto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 md:p-0 overflow-auto">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md md:w-96 mx-auto">
            <h3 className="text-xl font-bold mb-4 text-white">
              {modal.tipo === 'criar' ? 'Novo Serviço' : 'Editar Serviço'}
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                required
              />
              <input
                type="number"
                placeholder="Duração (min)"
                value={form.duracao}
                onChange={(e) => setForm({ ...form, duracao: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                required
              />
              <input
                type="number"
                placeholder="Preço"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                required
              />
              <input
                type="text"
                placeholder="Categoria"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setModal({ aberto: false, tipo: 'criar', servico: null })}
                  className="px-4 py-2 bg-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {erro && <p className="text-red-500 mt-4">{erro}</p>}
    </div>
  );
};

export default Services;
