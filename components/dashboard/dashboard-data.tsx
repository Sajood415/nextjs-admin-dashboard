'use client';

import React, { useEffect, useRef } from 'react';
import { useDashboard } from '@/context/dashboard/dashboard-context-provider';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js/auto';
import Card from '@/components/dashboard/card-data';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardData: React.FC = () => {
  const { averageRating, categoriesCount, loading, fetchDashboardData } = useDashboard();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (loading || !chartRef.current) {
      return;
    }

    const categoryLabels = Object.keys(categoriesCount);
    const categoryData = Object.values(categoriesCount);

    const ctx = chartRef.current.getContext('2d');

    if (ctx) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categoryLabels,
          datasets: [
            {
              label: 'Products by Category',
              data: categoryData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [categoriesCount, loading]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Average Rating" value={averageRating.toFixed(2)} />
        <Card title="Total Products" value={Object.values(categoriesCount).reduce((acc, count) => acc + count, 0)} />
        <Card title="Categories" value={Object.keys(categoriesCount).length} />
      </div>
      <div className="w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 overflow-x-auto">
        <div className="w-full h-96">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;