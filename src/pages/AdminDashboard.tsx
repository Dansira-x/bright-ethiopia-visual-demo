import React from 'react';
import PageTransition from '../components/PageTransition';

const AdminDashboard: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900">
          ⚙️ Admin Dashboard — Coming Soon
        </h2>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
