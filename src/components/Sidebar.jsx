export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white h-full p-4">
      <nav>
        <ul className="space-y-2">
          <li><a href="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</a></li>
          <li><a href="/servicos" className="block p-2 hover:bg-gray-700">Serviços</a></li>
          <li><a href="/horarios" className="block p-2 hover:bg-gray-700">Horários</a></li>
        </ul>
      </nav>
    </div>
  );
}