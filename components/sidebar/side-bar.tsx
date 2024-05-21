'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineProductionQuantityLimits, MdDashboard } from 'react-icons/md';
import Image from 'next/image';

interface SidebarProps {
  isVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, toggleSidebar }) => {
  const MenuItems = [
    {
      title: 'Products',
      href: '/products',
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <MdDashboard />,
    },
  ];

  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setTimeout(toggleSidebar, 100);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-14 md:top-0 left-0 h-full w-56 bg-gray-900 text-gray-100 p-4 transition-transform transform z-10 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 md:h-screen`}
    >
      <div className="flex justify-center items-center mb-4">
        <Image src="https://via.placeholder.com/50" width={50} height={50} alt="Placeholder" />
      </div>
      <nav>
        {MenuItems.map((item, index) => (
          <Link href={item.href} key={item.title}>
            <div
              className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              } ${index > 0 ? "mt-3" : ""}`}
              onClick={toggleSidebar}
            >
              <div className="text-2xl">{item.icon}</div>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          </Link>
        ))}
        </nav>
    </aside>
  );
};

export default Sidebar;
