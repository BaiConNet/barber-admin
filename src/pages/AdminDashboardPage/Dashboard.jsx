import React from 'react';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import DashboardContent from '../../components/DashboardContent'

export default function Dashboard() {
    return (
      <div className="grid grid-cols-12 grid-rows-6 gap-0 h-screen">
        {/* Header - ocupa toda a largura, 1 linha */}
        <header className="col-span-12 row-span-1">
          <Header />
        </header>
      
        {/* Sidebar - 2 colunas, 5 linhas restantes */}
        <aside className="col-span-2 row-span-5 bg-gray-800">
          <Sidebar />
        </aside>
      
          {/* Main Content - 10 colunas, 5 linhas restantes */}
        <DashboardContent className="col-span-10 row-span-5 bg-gray-100" />
    </div>
  );
    
}