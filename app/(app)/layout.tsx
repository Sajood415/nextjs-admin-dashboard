'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar/side-bar';
import Navbar from '@/components/navbar/nav-bar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      <div className="flex-1 flex flex-col h-full relative top-20 overflow-x-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;
