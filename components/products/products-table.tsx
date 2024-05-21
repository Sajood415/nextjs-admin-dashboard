'use client';

import React, { useEffect, useState } from 'react';
import { useProducts } from '@/context/products/products-context-provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const ProductsTable: React.FC = () => {
  const { products, loading, fetchProducts, total } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);
  const maxVisiblePages = 4;

  useEffect(() => {
    fetchProducts((currentPage - 1) * itemsPerPage, itemsPerPage);
  }, [fetchProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow-lg bg-white mb-10 h-full flex flex-col justify-between">
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <TableRow key={product.id} className="hover:bg-gray-100">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4 pb-4">
        <Pagination>
          {currentPage > 1 ? (
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
          ) : (
            <span className="px-4 py-2 text-gray-400">Previous</span>
          )}
          <PaginationContent>
            {getPageNumbers().map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200'}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          {currentPage < totalPages ? (
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          ) : (
            <span className="px-4 py-2 text-gray-400">Next</span>
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default ProductsTable;