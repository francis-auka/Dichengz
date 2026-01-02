import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { fadeInUp, staggerContainer, hoverLift } from '../utils/animations';
import { getHomepage } from '../services/sanity';
import CloudinaryImage from '../components/CloudinaryImage';

const HomePage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [heroImages, setHeroImages] = useState<string[]>([]);
    const [newArrivals, setNewArrivals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHomepage()
            .then(data => {
                if (data) {
                    if (data.hero && data.hero.images) {
                        setHeroImages(data.hero.images);
                    }
                    if (data.newArrivals) {
                        setNewArrivals(data.newArrivals);
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching homepage data:', err);
                setLoading(false);
            });
    }, []);

    // Fallback images if no data from Sanity
    const defaultHeroImages = [
        "/assets/images/hero/hero-1.jpg",
        "/assets/images/hero/hero-2.jpg",
        "/assets/images/hero/hero-3.jpg",
        "/assets/images/hero/hero-4.jpg",
        "/assets/images/hero/hero-5.jpg"
    ];

    const displayImages = heroImages.length > 0 ? heroImages : defaultHeroImages;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 6000); // Slower transition for editorial feel
        return () => clearInterval(interval);
    }, [displayImages]);

    if (loading) {
        return (
            <MainLayout>
                <div className="h-screen flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center px-4 md:px-20 text-white bg-secondary overflow-hidden">
                {/* Carousel Background */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1.08 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 z-0"
                    >
                        {heroImages.length > 0 ? (
                            <CloudinaryImage
                                publicId={displayImages[currentImageIndex]}
                                alt={`Fashion Editorial ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover object-[center_20%] md:object-[center_15%]"
                            />
                        ) : (
                            <img
                                src={displayImages[currentImageIndex]}
                                alt={`Fashion Editorial ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover object-[center_20%] md:object-[center_15%]"
                                loading="eager"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div> {/* Editorial overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> {/* Bottom fade */}
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-10 max-w-4xl text-center">
                    <motion.p
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                        className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 text-primary font-medium"
                    >
                        The New Collection
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                        className="text-5xl md:text-8xl font-bold mb-8 leading-tight font-serif tracking-tight"
                    >
                        African Fashion <br /> <span className="italic text-primary">Reimagined</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-10 py-4 rounded-full font-semibold shadow-lg text-sm tracking-widest uppercase"
                            >
                                Shop Collection
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-semibold text-sm tracking-widest uppercase"
                            >
                                View Lookbook
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold mb-4"
                    >
                        New Arrivals
                    </motion.h2>
                    <div className="flex justify-center space-x-6 text-sm text-gray-500 uppercase tracking-wide">
                        <Link to="/shop?category=Women" className="text-primary font-semibold border-b-2 border-primary pb-1 cursor-pointer">Women</Link>
                        <Link to="/shop?category=Men" className="cursor-pointer hover:text-primary transition-colors">Men</Link>
                        <Link to="/shop?category=Shoes" className="cursor-pointer hover:text-primary transition-colors">Shoes</Link>
                        <Link to="/shop?category=Bags" className="cursor-pointer hover:text-primary transition-colors">Bags</Link>
                        <Link to="/shop?category=Accessories" className="cursor-pointer hover:text-primary transition-colors">Accessories</Link>
                    </div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {newArrivals.length > 0 ? (
                        newArrivals.map((product) => (
                            <Link to={`/product/${product.slug}`} key={product._id}>
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover="hover"
                                    className="group cursor-pointer"
                                >
                                    <motion.div
                                        variants={hoverLift}
                                        className="bg-gray-100 aspect-square mb-4 relative overflow-hidden"
                                    >
                                        {product.imageUrl ? (
                                            <CloudinaryImage
                                                publicId={product.imageUrl}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </motion.div>
                                    <p className="text-xs text-gray-500 mb-1 uppercase">{product.category}</p>
                                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        // Fallback / Placeholder if no new arrivals selected
                        [1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover="hover"
                                className="group cursor-pointer"
                            >
                                <motion.div
                                    variants={hoverLift}
                                    className="bg-gray-100 aspect-square mb-4 relative overflow-hidden"
                                >
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Product Image</div>
                                </motion.div>
                                <p className="text-xs text-gray-500 mb-1">CATEGORY</p>
                                <h3 className="font-semibold text-sm mb-1">Product Name</h3>
                                <p className="text-gray-500 text-sm">$0.00</p>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </section>

            {/* Promo Grid */}
            <section className="container mx-auto px-4 mb-20">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <motion.div variants={fadeInUp} className="group relative h-96 flex flex-col justify-center items-start p-8 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
                            alt="Ethereal Elegance"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-white/70 group-hover:bg-white/60 transition-colors z-0"></div>
                        <div className="relative z-10">
                            <p className="text-xs uppercase tracking-widest mb-2 text-primary font-bold">Ethereal Elegance</p>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Where Dreams Meet Couture</h3>
                            <Link to="/shop" className="bg-primary text-white px-6 py-2 text-sm font-semibold hover:bg-primary-dark transition inline-block">Shop Now</Link>
                        </div>
                    </motion.div>
                    <div className="grid grid-rows-2 gap-4 h-96">
                        <motion.div variants={fadeInUp} className="group relative flex flex-col justify-center items-start p-8 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop"
                                alt="Radiant Reverie"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-white/70 group-hover:bg-white/60 transition-colors z-0"></div>
                            <div className="relative z-10">
                                <p className="text-xs uppercase tracking-widest mb-2 text-primary font-bold">Radiant Reverie</p>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Enchanting Styles for Every Woman</h3>
                                <Link to="/shop" className="bg-primary text-white px-6 py-2 text-sm font-semibold hover:bg-primary-dark transition inline-block">Shop Now</Link>
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp} className="group relative flex flex-col justify-center p-6 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop"
                                    alt="Urban Strides"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-white/70 group-hover:bg-white/60 transition-colors z-0"></div>
                                <div className="relative z-10">
                                    <p className="text-xs uppercase tracking-widest mb-1 text-primary font-bold">Urban Strides</p>
                                    <h3 className="text-lg font-bold mb-2 text-gray-900">Chic Footwear</h3>
                                    <Link to="/shop" className="bg-primary text-white px-4 py-1 text-xs font-semibold self-start hover:bg-primary-dark transition inline-block">Shop Now</Link>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="group relative bg-secondary text-white p-6 flex flex-col justify-center items-center text-center overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop"
                                    alt="Trendsetting Bags"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-black/20 z-0"></div>
                                <div className="relative z-10">
                                    <p className="text-sm mb-1 font-medium">Trendsetting Bags</p>
                                    <h3 className="text-4xl font-serif italic mb-2 text-primary">50%</h3>
                                    <Link to="/shop" className="bg-white text-black px-4 py-1 text-xs font-semibold hover:bg-gray-200 transition inline-block">Shop Now</Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </MainLayout>
    );
};

export default HomePage;
