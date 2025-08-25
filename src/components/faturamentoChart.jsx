import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// O componente recebe os dados do gráfico via props
export default function FaturamentoChart({ data }) {
  return (
    // ResponsiveContainer faz o gráfico se adaptar ao tamanho do container pai
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
        {/* Adiciona um grid cinza claro no fundo */}
        <CartesianGrid strokeDasharray="333" stroke="#4A5568" />
        
        {/* Define o que vai no eixo X (horizontal) - os dias */}
        <XAxis dataKey="dia" stroke="#A0AEC0" />

        {/* Define o que vai no eixo Y (vertical) - os valores */}
        <YAxis stroke="#A0AEC0" />

        {/* Tooltip é a caixinha que aparece ao passar o mouse em cima da barra */}
        <Tooltip
          contentStyle={{
            backgroundColor: '#1A202C',
            borderColor: '#2D3748',
            borderRadius: '0.5rem',
          }}
        />

        {/* Define as barras do gráfico */}
        <Bar dataKey="faturamento" fill="#4299E1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}