import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    sku: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
    color: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (sku: string) => void;
    updateQuantity: (sku: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.sku === item.sku);
            if (existing) {
                return prev.map(i => i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i);
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (sku: string) => {
        setCart(prev => prev.filter(i => i.sku !== sku));
    };

    const updateQuantity = (sku: string, quantity: number) => {
        setCart(prev => prev.map(i => i.sku === sku ? { ...i, quantity } : i));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
