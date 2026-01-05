import axios from 'axios';
import { API_URL } from '../config';


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
