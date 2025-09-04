
import React from 'react';

// Componente de card de estatísticas para o dashboard
const colorClasses = {
  green: 'bg-green-500/20 text-green-400',
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  red: 'bg-red-500/20 text-red-400'
}

export default function StatsCard({ title, value, change, trend, icon: Icon, color }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className="flex-1">
        <div className="text-gray-400 text-sm font-medium">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center space-x-1 mt-1">
          <span className={`text-xs font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
          <span className="text-xs text-gray-400">{trend === 'up' ? '▲' : '▼'}</span>
        </div>
      </div>
    </div>
  );
}
