import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

// Nosos compenentes recebe os dados (data) como uma prioridade (prop)
export default function PopularServicesChart({ data }) {
  return (
    // ResponsiveContainer: Garante que o gráfico ocupe 100% do espaço da 'caixa' (div)
    // onde o colocarmos, e se ajuste ao tamanho da tela.
    <ResponsiveContainer width="100%" height={300}>
      {/* PieChart: O container principal que diz à Recharts que vamos desenhar um gráfico de pizza. */}
      <PieChart>
        {/* Tooltip: A caixinha de informações que aparece quando passamos o mouse sobre uma fatia. */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#f1f3f8ff",
            borderColor: "#2D3748",
            borderRadius: "0.5rem",
          }}
        />
        <Pie
          data={data} // Informamos de onde vêm os dados
          dataKey="value" // Dizemos qual campo dos dados define o TAMANHO da fatia (ex: value: 45)
          nameKey="name" // Dizemos qual campo dá o NOME à fatia (ex: name: 'Corte')
          cx="50%" // Centraliza o gráfico horizontalmente no meio do container
          cy="50%" // Centraliza o gráfico verticalmente
          innerRadius={70} // Cria o buraco no meio, transformando a pizza em uma "rosca" (Donut Chart)
          outerRadius={100} // Define o tamanho externo da rosca
          paddingAngle={5} // Cria um pequeno espaçamento branco entre as fatias, para um visual mais limpo
        >
            {
              // Este é um pequeno truque da Recharts.
              // Usamos um .map() para criar um componente <Cell> para cada item nos nossos dados.
              // É assim que dizemos para cada fatia usar a cor que definimos na propriedade 'fill'.  
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))
            }
        </Pie>
        {/* Legend: A legenda que mostra o nome e a cor de cada serviço, abaixo do gráfico. */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
