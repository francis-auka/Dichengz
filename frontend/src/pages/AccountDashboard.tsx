import React from 'react';
import MainLayout from '../layouts/MainLayout';

const AccountDashboard: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Account Dashboard</h1>
                <p>User orders and wishlist go here.</p>
            </div>
        </MainLayout>
    );
};

export default AccountDashboard;
