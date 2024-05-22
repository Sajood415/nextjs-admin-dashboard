'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { login } from '@/actions/auth/login';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async (username: string, password: string) => {
    const response = await login(username, password);
    if (typeof window !== 'undefined') {
      document.cookie = `token=${response.token}; path=/`;
      localStorage.setItem('user', JSON.stringify(response));
    }
    setUser(response);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      localStorage.removeItem('user');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
