import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface OrderData {
    phoneNumber: string;
    amount: number;
    items: any[];
    userId?: string;
    customer?: {
        name?: string;
        phone: string;
    };
    paymentMethod?: string;
}

export const placeOrder = async (orderData: OrderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
};
