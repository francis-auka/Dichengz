import React from 'react';
import MainLayout from '../layouts/MainLayout';

const CartPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Cart</h1>
                <p>Cart items go here.</p>
            </div>
        </MainLayout>
    );
};

export default CartPage;
