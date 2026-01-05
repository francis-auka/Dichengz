import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';

interface Order {
    _id: string;
    orderId: string;
    customer: {
        name?: string;
        phone: string;
    };
    items: any[];
    total: number;
    paymentMethod: string;
    paymentStatus: string;
    status: string;
    createdAt: string;
}

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const adminToken = sessionStorage.getItem('adminToken');

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`, {
                headers: { 'x-admin-secret': adminToken }
            });
            setOrders(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (id: string, updates: any) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/admin/orders/${id}`, updates, {
                headers: { 'x-admin-secret': adminToken }
            });
            fetchOrders();
        } catch (err: any) {
            alert(err.response?.data?.error || 'Update failed');
        }
    };

    const contactCustomer = (phone: string, orderId: string) => {
        const message = encodeURIComponent(`Hi, this is Dichengz regarding your order ${orderId}.`);
        window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
    };

    if (loading) return <MainLayout><div className="p-12 text-center">Loading orders...</div></MainLayout>;

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Order Management</h1>
                    <button onClick={fetchOrders} className="text-primary hover:underline">Refresh</button>
                </div>

                {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-6">{error}</div>}

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Order ID</th>
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Customer</th>
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Items</th>
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Total</th>
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Payment</th>
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Status</th>
                                <th className="p-4 font-bold text-sm uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <span className="font-mono text-xs block">{order.orderId}</span>
                                        <span className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-semibold">{order.customer.name || 'Guest'}</p>
                                        <p className="text-sm text-gray-500">{order.customer.phone}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs space-y-1">
                                            {order.items.map((item, i) => (
                                                <div key={i}>{item.quantity}x {item.name}</div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold">KSH {order.total.toFixed(2)}</td>
                                    <td className="p-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase bg-gray-100 px-2 py-0.5 rounded block w-fit">{order.paymentMethod}</span>
                                            <select
                                                value={order.paymentStatus}
                                                onChange={(e) => updateOrderStatus(order._id, { paymentStatus: e.target.value })}
                                                className={`text-xs border rounded p-1 ${order.paymentStatus === 'paid' ? 'text-green-600 border-green-200 bg-green-50' : 'text-orange-600 border-orange-200 bg-orange-50'}`}
                                            >
                                                <option value="unpaid">Unpaid</option>
                                                <option value="paid">Paid</option>
                                                <option value="failed">Failed</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, { status: e.target.value })}
                                            className="text-xs border border-gray-300 rounded p-1"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="awaiting_payment">Awaiting Payment</option>
                                            <option value="paid">Paid</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="ready">Ready</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => contactCustomer(order.customer.phone, order.orderId)}
                                            className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] transition shadow-sm"
                                            title="Contact on WhatsApp"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminOrdersPage;
