const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function placeOrder(orderData: {
    phoneNumber: string;
    amount: number;
    items: any[];
    userId?: string;
}) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to place order');
    }

    return await response.json();
}
