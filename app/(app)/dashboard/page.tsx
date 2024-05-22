import React from 'react';
import DashboardData from '@/components/dashboard/dashboard-data';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 overflow-x-auto overflow-y-auto h-screen">
      <DashboardData />
    </div>
  );
};

export default DashboardPage;