'use client';

import React, { useEffect, useState } from 'react';
import { useProducts } from '@/context/products/products-context-provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TablePagination from '@/components/products/table-pagination';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Image from 'next/image';

const ProductsTable: React.FC = () => {
  const { products, loading, fetchProducts, total } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    fetchProducts((currentPage - 1) * itemsPerPage, itemsPerPage);
  }, [fetchProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow-lg bg-white mb-10 h-full flex flex-col justify-between">
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <TableRow key={product.id} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Tooltip>
                    <TooltipTrigger>
                      <span>{product.description.length > 10 ? `${product.description.slice(0, 10)}...` : product.description}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{product.description}</span>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">${product.price}</TableCell>
                <TableCell className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{product.category}</TableCell>
                <TableCell className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{product.brand}</TableCell>
                <TableCell className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{product.stock}</TableCell>
                <TableCell className="px-5 py-3 whitespace-nowrap text-sm text-gray-500">
                  <Image src={product.thumbnail} alt={product.title} width={50} height={50} className="rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4 pb-4">
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ProductsTable;