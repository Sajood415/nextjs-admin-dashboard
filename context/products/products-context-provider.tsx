'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, getProducts } from '@/actions/products/get-products';

interface ProductsContextType {
  products: Product[];
  total: number;
  loading: boolean;
  fetchProducts: (skip: number, limit: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async (skip: number, limit: number) => {
    setLoading(true);
    try {
      const data = await getProducts(skip, limit);
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, total, loading, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};