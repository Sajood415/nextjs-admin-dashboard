'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar/side-bar';
import Navbar from '@/components/navbar/nav-bar';
import { ProductsProvider } from '@/context/products/products-context-provider';
import LoaderContent from '@/components/loader/LoaderContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <ProductsProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
          <div className="relative flex-1 top-16 overflow-y-auto">
            <LoaderContent>{children}</LoaderContent>
          </div>
        </div>
      </div>
    </ProductsProvider>
  );
};

export default Layout;