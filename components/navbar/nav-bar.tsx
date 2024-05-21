import React from 'react';
import { usePathname } from 'next/navigation';
import UserProfile from '@/components/navbar/user-profile';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarVisible }) => {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith('/products')) return 'Products';
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    return 'App';
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-10 md:left-56">
      <div className="flex justify-between items-center">
        <button className="md:hidden" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isSidebarVisible ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold">{getTitle()}</h1>
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
