import React from "react";
import FaturamentoChart from "./faturamentoChart";
import KpiCard from "./KpiCard";
import PopularServicesChart from "./PopularServicesChart";
import AgendamentoItem from "./AgendamentoItem";

export default function DashboardContent() {
  const dadosPainel = {
    agendamentosHoje: 25,
    faturamentoDoDia: "R$ 850",
    novoCliente: 5,
    taxaOcupacao: "85%",
  };

  const dadosGraficoFaturamento = [
    { dia: "Seg", faturamento: 1250 },
    { dia: "Ter", faturamento: 980 },
    { dia: "Qua", faturamento: 1530 },
    { dia: "Qui", faturamento: 1100 },
    { dia: "Sex", faturamento: 1890 },
    { dia: "Sáb", faturamento: 2300 },
  ];

  const dadosGraficoPizza = [
    { name: "corte", value: 45, fill: "#3B82F6" },
    { name: "Barba", value: 20, fill: "#10B981" },
    { name: "Coloração", value: 15, fill: "#F59E0B" },
    { name: "Outros", value: 10, fill: "#6B7280" },
  ];

  const dadosProximosAgendamentos = [
    { id: 1, nome: "Carlos Silva", horario: "14:00" },
    { id: 2, nome: "João Silva", horario: "16:00" },
    { id: 3, nome: "Alex Silva", horario: "10:00" },
    { id: 4, nome: "Bernardo Silva", horario: "15:00" },
  ];

  return (
    // Adicionando um pouco de padding geral ao contêiner
    <div className="p-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          titulo="Agendamentos Hoje"
          valor={dadosPainel.agendamentosHoje}
        />
        <KpiCard
          titulo="Faturamento do Dia"
          valor={dadosPainel.faturamentoDoDia}
        />
        <KpiCard titulo="Novos Clientes" valor={dadosPainel.novoCliente} />
        <KpiCard titulo="Taxa de Ocupação" valor={dadosPainel.taxaOcupacao} />
      </div>

      {/* Container principal para a área de baixo (gráficos e listas) */}
      {/* Em telas pequenas (mobile), terá 1 coluna. Em telas grandes (lg), terá 3 colunas. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Coluna da Esquerda: Gráficos (ocupando 2 das 3 colunas em telas grandes) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-barber-graphic rounded-xl shadow-lg p-6">
            <h2 className="text-white font-bold text-lg mb-4">
              Faturamento Semanal
            </h2>
            <FaturamentoChart data={dadosGraficoFaturamento} />
          </div>

          <div className="bg-barber-graphic rounded-xl shadow-lg p-6">
            <h2 className="text-white font-bold text-lg mb-4">
              Serviços Mais Populares
            </h2>
            <PopularServicesChart data={dadosGraficoPizza} />
          </div>
        </div>

        {/* Coluna da Direita: Lista (ocupando 1 das 3 colunas em telas grandes) */}
        <div className="bg-barber-graphic rounded-xl shadow-lg p-6">
          <h2 className="text-slate-300 font-semibold text-lg p-2 mb-2">
            Próximos Agendamentos
          </h2>

          <div className="space-y-2 max-h-[350px] overflow-y-auto">
            {/* - .map() é a forma padrão no React de transformar um array de dados em uma lista de componentes.
              - Para cada 'agendamento' no nosso array, renderizamos um componente <AgendamentoItem>.
              - A 'key' é uma propriedade especial que o React precisa para otimizar a lista.
              - 'space-y-2' é uma classe do Tailwind que adiciona um espaço vertical entre cada item da lista. */}

            {dadosProximosAgendamentos.map((ag) => (
              <AgendamentoItem
                key={ag.id}
                nome={ag.nome}
                horario={ag.horario}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
