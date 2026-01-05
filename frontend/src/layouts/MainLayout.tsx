import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { pageTransition } from '../utils/animations';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const categories = ['Women', 'Men', 'Shoes', 'Bags', 'Accessories'];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-secondary">
            <header className="bg-secondary text-white shadow-sm sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative">
                    <Link to="/" className="flex items-center relative z-[70]" onClick={() => setIsMenuOpen(false)}>
                        <img src="/logo.png" alt="Dichengz" className="h-16 md:h-20 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-6 relative z-[70]">
                        <Link to="/account" className="hidden md:block hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Account</Link>
                        <Link to="/cart" className="relative hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white block transition-transform"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-0.5 bg-white block"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white block transition-transform"
                            />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 bg-secondary z-[60] flex flex-col pt-32 px-8 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col space-y-8">
                                {navLinks.map((link) => (
                                    <motion.div key={link.name} variants={linkVariants}>
                                        <Link
                                            to={link.path}
                                            className="text-4xl font-serif italic text-white hover:text-primary transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div variants={linkVariants} className="pt-8 border-t border-white/10">
                                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Categories</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat}
                                                to={`/shop?category=${cat}`}
                                                className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {cat}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div variants={linkVariants} className="pt-8">
                                    <Link
                                        to="/account"
                                        className="text-primary uppercase tracking-widest text-sm font-bold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Account
                                    </Link>
                                </motion.div>
                            </div>

                            <motion.div
                                variants={linkVariants}
                                className="mt-auto pb-12 text-gray-500 text-xs tracking-widest uppercase"
                            >
                                &copy; 2026 Dichengz Fashion House
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                        <img src="/logo.png" alt="Dichengz" className="h-20 w-auto mb-4 brightness-0 invert" />
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
