'use client';

import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  description?: string;
}

const Card: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 hover:bg-blue-100 transition duration-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  );
};

export default Card;