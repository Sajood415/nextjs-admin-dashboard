import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TableFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  brands: string[];
  selectedBrand: string;
  onBrandChange: (value: string) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  searchValue,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrand,
  onBrandChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
      <div className="mb-4 md:mb-0 md:flex-1">
        <Input
          placeholder="Search with Title"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full lg:w-[300px]"
        />
      </div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:flex-none">
        <Select onValueChange={onCategoryChange} value={selectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={onBrandChange} value={selectedBrand}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brands</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TableFilter;