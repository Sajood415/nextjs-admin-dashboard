'use client';

import React from 'react';
import { useProducts } from '@/context/products/products-context-provider';
import Loader from '@/components/ui/loader';

interface LoaderContentProps {
  children: React.ReactNode;
}

const LoaderContent: React.FC<LoaderContentProps> = ({ children }) => {
  const { loading } = useProducts();

  return (
    <div className="relative flex-1">
      {loading && <Loader />}
      {children}
    </div>
  );
};

export default LoaderContent;