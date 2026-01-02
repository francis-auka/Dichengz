import React from 'react';
import MainLayout from '../layouts/MainLayout';

const CheckoutPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <p>Checkout form goes here.</p>
            </div>
        </MainLayout>
    );
};

export default CheckoutPage;
