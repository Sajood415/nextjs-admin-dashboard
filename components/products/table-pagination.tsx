'use client';

import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
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
        <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </Pagination>
  );
};

export default TablePagination;