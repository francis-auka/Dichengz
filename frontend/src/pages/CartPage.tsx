import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../context/CartContext';
import CloudinaryImage from '../components/CloudinaryImage';
import { Link } from 'react-router-dom';
import { placeOrder } from '../services/checkout';

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleMpesaCheckout = async () => {
        if (!phoneNumber) {
            setErrorMessage('Please enter your M-Pesa phone number');
            setPaymentStatus('error');
            return;
        }

        setIsPaying(true);
        setPaymentStatus('pending');
        setErrorMessage('');

        try {
            const result = await placeOrder({
                phoneNumber: phoneNumber.startsWith('0') ? '254' + phoneNumber.substring(1) : phoneNumber,
                amount: total,
                items: cart.map(item => ({
                    sku: item.sku,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            });

            console.log('Order result:', result);
            setPaymentStatus('success');
            // Clear cart after successful initiation (or wait for callback if you have a way to poll)
            // clearCart(); 
        } catch (err: any) {
            console.error('Payment error:', err);
            setErrorMessage(err.message || 'Failed to initiate payment');
            setPaymentStatus('error');
        } finally {
            setIsPaying(false);
        }
    };

    const generateWhatsAppMessage = () => {
        let message = "Hi, I'd like to place an order:\n\n";

        cart.forEach(item => {
            message += `Product: ${item.name}\n`;
            if (item.size) message += `Size: ${item.size}\n`;
            if (item.color) message += `Color: ${item.color}\n`;
            message += `Quantity: ${item.quantity}\n`;
            message += `Link: https://dichengz.com/product/${item.sku}\n\n`;
        });

        message += "--------------------------------\n";
        message += `Total: $${total.toFixed(2)}`;

        return encodeURIComponent(message);
    };

    const whatsappNumber = "254704895430";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
                        <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div key={`${item.sku}-${item.size}-${item.color}`} className="flex gap-4 border-b border-gray-100 pb-6">
                                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                                        {item.image ? (
                                            <CloudinaryImage
                                                publicId={item.image}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-2">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 mb-4 space-y-1">
                                            {item.size && <p>Size: {item.size}</p>}
                                            {item.color && <p>Color: {item.color}</p>}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.sku, Math.max(1, item.quantity - 1))}
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.sku)}
                                                className="text-red-500 text-sm hover:text-red-700 underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                                <div className="flex justify-between mb-4 text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 0712345678"
                                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        onClick={handleMpesaCheckout}
                                        disabled={isPaying}
                                        className={`w-full py-4 rounded-full font-bold text-lg transition shadow-lg flex items-center justify-center gap-2 ${isPaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'
                                            }`}
                                    >
                                        {isPaying ? 'Processing...' : 'Pay with M-Pesa'}
                                    </button>

                                    {paymentStatus === 'pending' && (
                                        <p className="text-sm text-blue-600 text-center animate-pulse">
                                            Please check your phone for the M-Pesa prompt.
                                        </p>
                                    )}

                                    {paymentStatus === 'success' && (
                                        <div className="bg-green-50 text-green-700 p-3 rounded text-sm text-center">
                                            Payment initiated! Check your phone to complete the transaction.
                                        </div>
                                    )}

                                    {paymentStatus === 'error' && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded text-sm text-center">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>

                                <div className="relative flex items-center justify-center mb-6">
                                    <div className="border-t border-gray-300 w-full"></div>
                                    <span className="bg-gray-50 px-3 text-gray-500 text-sm">OR</span>
                                    <div className="border-t border-gray-300 w-full"></div>
                                </div>

                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#25D366] text-white text-center py-4 rounded-full font-bold text-lg hover:bg-[#128C7E] transition shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span>Order via WhatsApp</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default CartPage;
