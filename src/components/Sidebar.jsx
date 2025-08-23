// src/components/Sidebar.jsx
import { ChartBarIcon, ScissorsIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <div className="bg-gray-700 text-white h-full p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="rounded-full block p-3 hover:bg-gray-600 hover:scale-105 transition-all duration-200 flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="/servicos" className="rounded-full block p-3 hover:bg-slate-600 hover:scale-105 transition-all duration-200 flex items-center gap-3">
              <ScissorsIcon className="w-5 h-5" />
              Serviços
            </a>
          </li>
          <li>
            <a href="/horarios" className="rounded-full block p-3 hover:bg-indigo-600 hover:scale-105 transition-all duration-200 flex items-center gap-3">
              <ClockIcon className="w-5 h-5" />
              Horários
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}