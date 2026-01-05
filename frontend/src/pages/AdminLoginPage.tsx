import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const AdminLoginPage: React.FC = () => {
    const [secret, setSecret] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (secret) {
            sessionStorage.setItem('adminToken', secret);
            navigate('/admin/orders');
        } else {
            setError('Please enter the admin secret');
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 flex justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-100">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Secret</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Enter secret token"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-secondary text-white py-3 rounded-full font-bold hover:bg-black transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminLoginPage;
