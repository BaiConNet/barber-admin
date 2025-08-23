export default function DashboardContent() {
  return (
    <div className="p-6">
      <div className="mb-6 grid place-items-center">
        <h1 className="text-3xl font-bold text-gray-800">Bem-vindo ao Dashboard</h1>
        <p className="text-gray-600">Gerencie sua barbearia de forma eficiente</p>
      </div>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-0 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Agendamentos Hoje</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        {/* Mais cards... */}
      </div>
      
      {/* Mais conteúdo do dashboard */}
    </div>
  );
}