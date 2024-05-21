import React from 'react';
import ProductsTable from '@/components/products/products-table';

const ProductsPage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-full flex flex-col">
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;