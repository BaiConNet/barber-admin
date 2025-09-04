import React, { useState } from 'react';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import DashboardContent from '../../components/DashboardContent'

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-16'}`}>
        <Header />
        <main>
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}