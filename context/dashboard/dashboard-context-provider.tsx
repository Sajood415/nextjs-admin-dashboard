'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { getDashboardData, Product } from '@/actions/dashboard/get-dashboard';

interface DashboardContextType {
  averageRating: number;
  categoriesCount: { [key: string]: number };
  loading: boolean;
  fetchDashboardData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboardData();

      const totalRating = data.products.reduce((acc: number, product: Product) => acc + product.rating, 0);
      const averageRating = totalRating / data.products.length;
      const categoriesCount = data.products.reduce((acc: any, product: Product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      setAverageRating(averageRating);
      setCategoriesCount(categoriesCount);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DashboardContext.Provider value={{ averageRating, categoriesCount, loading, fetchDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};