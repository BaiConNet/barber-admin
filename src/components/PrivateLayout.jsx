import React, { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function PrivateLayout({ children, currentPage, subTitle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen min-h-screen bg-barber-card text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-16'} bg-barber-card`}>
        {/* Header */}
        <Header sidebarOpen={isOpen} setSidebarOpen={setIsOpen} currentPage={currentPage} subTitle={subTitle} />

        {/* Page content */}
        <main className="grid grid-cols-1 flex-1 p-4 p-6 overflow-auto bg-barber-card min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
