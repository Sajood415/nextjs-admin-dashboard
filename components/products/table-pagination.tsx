'use client';

import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 4;

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
    <Pagination>
      {currentPage > 1 ? (
        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
      ) : (
        <span className="px-4 py-2 text-gray-400">Previous</span>
      )}
      <PaginationContent>
        {getPageNumbers().map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className={page === currentPage ? 'bg-gray-300 text-gray-900' : 'hover:bg-gray-200'}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      {currentPage < totalPages ? (
        <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
      ) : (
        <span className="px-4 py-2 text-gray-400">Next</span>
      )}
    </Pagination>
  );
};

export default TablePagination;
