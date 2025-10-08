// src/components/RevenueChart.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// Vamos usar um ícone da biblioteca que você já tem no projeto
import { BarChartBig } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  // ... (seu código do CustomTooltip continua igual, sem alterações)
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 text-white shadow-lg">
        <p className="label mb-2 font-semibold">{`${label}`}</p>
        {payload.map((pld, index) => (
          <p
            key={index}
            style={{ color: pld.color }}
            className="text-sm"
          >{`${pld.name}: ${
            pld.name === "Receita" ? `R$ ${pld.value.toFixed(2)}` : pld.value
          }`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data }) => {
  return (
    // O container principal do card, que já existe
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Receita Mensal</h3>
        {/* ... (sua legenda de Receita e Agendamentos continua igual) ... */}
      </div>

      {/* AQUI ESTÁ A LÓGICA PRINCIPAL */}
      <div className="h-80">
        {/* Verificamos se 'data' não existe ou se o array está vazio */}
        {!data || data.length === 0 ? (
          // Se estiver vazio, mostramos o nosso "Empty State"
          <div className="flex h-full w-full flex-col items-center justify-center">
            <BarChartBig className="h-12 w-12 text-gray-600" />
            <p className="mt-4 text-sm text-gray-500">
              Ainda não há dados de receita para exibir.
            </p>
            <p className="text-xs text-gray-600">
              Agendamentos concluídos aparecerão aqui.
            </p>
          </div>
        ) : (
          // Se houver dados, mostramos o gráfico normalmente
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="receita"
                name="Receita"
                stroke="#F59E0B"
                // ... (resto das props da linha de Receita)
              />
              <Line
                type="monotone"
                dataKey="agendamentos"
                name="Agendamentos"
                stroke="#3B82F6"
                // ... (resto das props da linha de Agendamentos)
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;