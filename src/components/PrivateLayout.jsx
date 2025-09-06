import React, { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function PrivateLayout({ children, currentPage }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex bg-barber-card">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-16'} flex flex-col`}>
        {/* Header */}
        <Header sidebarOpen={isOpen} setSidebarOpen={setIsOpen} currentPage={currentPage} />

        {/* Page content */}
        <main className="p-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
