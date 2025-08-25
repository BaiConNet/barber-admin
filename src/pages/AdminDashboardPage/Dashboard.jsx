import React from 'react';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import DashboardContent from '../../components/DashboardContent'

export default function Dashboard() {
  return (
      <div className="h-screen grid grid-rows-[auto_1fr]">
      {/* Header - ocupa toda a largura, 1 linha */}
        <header className="border-b bg-slate-700 col-span-full">
          <Header />
      </header>

      {/* Área principal - ocupa resto da altura */}
        <div className="grid grid-cols-[250px_1fr]">
        {/* Sidebar - largura fixa*/}
        <aside className="border-r">
          <Sidebar />
        </aside>

        {/* Conteúdo - ocupa resto da largura */}
        <main className="bg-barber-bg">
          <DashboardContent />
        </main>

      </div>
    </div>
  );
    
}