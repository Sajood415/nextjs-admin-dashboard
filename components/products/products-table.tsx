'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useProducts } from '@/context/products/products-context-provider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TablePagination from '@/components/products/table-pagination';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Image from 'next/image';
import TableFilter from '@/components/products/table-filter';

const ProductsTable: React.FC = () => {
  const { products, loading, fetchProducts, total } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  const fetchProductsRef = useRef(fetchProducts);

  useEffect(() => {
    fetchProductsRef.current = fetchProducts;
  }, [fetchProducts]);

  useEffect(() => {
    fetchProductsRef.current((currentPage - 1) * itemsPerPage, itemsPerPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setSearchValue(''); 
    setSelectedCategory('all'); 
    setSelectedBrand('all');
    setCurrentPage(page);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    return matchesTitle && matchesCategory && matchesBrand;
  });

  return (
    <div className="w-full p-4 border rounded-lg shadow-lg bg-white h-full flex flex-col justify-between mb-12">
      <TableFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        categories={Array.from(new Set(products.map((product) => product.category)))}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        brands={Array.from(new Set(products.map((product) => product.brand)))}
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
      />
      {filteredProducts.length > 0 ? (
        <>
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
                {filteredProducts.map(product => (
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
                      <div className="w-16 h-16">
                        <Image src={product.thumbnail} alt={product.title} width={64} height={64} className="rounded object-cover w-full h-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center mt-4 pb-4">
            <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No Products Found
        </div>
      )}
    </div>
  );
};

export default ProductsTable;