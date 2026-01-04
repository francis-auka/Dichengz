import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { pageTransition } from '../utils/animations';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { cart } = useCart();
    const categories = ['Women', 'Men', 'Shoes', 'Bags', 'Accessories'];

    return (
        <div className="min-h-screen flex flex-col font-sans text-secondary">
            <header className="bg-secondary text-white shadow-sm sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="Dichengz" className="h-12 w-auto" />
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/account" className="hover:text-primary transition-colors">Account</Link>
                        <Link to="/cart" className="relative hover:text-primary transition-colors">
                            Cart
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="flex-grow bg-white">
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageTransition}
                    className="w-full h-full"
                >
                    {children}
                </motion.div>
            </main>
            <footer className="bg-secondary text-white py-12 border-t border-secondary-light">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <img src="/logo.png" alt="Dichengz" className="h-12 w-auto mb-4 brightness-0 invert" />
                        <p className="text-gray-400">Urban edge meets modern elegance.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <Link to={`/shop?category=${cat}`} className="hover:text-primary transition-colors">
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/shipping-returns" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
