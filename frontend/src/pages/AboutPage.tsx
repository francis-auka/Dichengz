import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const AboutPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="bg-white">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=2070&auto=format&fit=crop"
                            alt="About Dichengz"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="relative z-10 text-center text-white px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold font-serif mb-4"
                        >
                            Our Story
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl max-w-2xl mx-auto font-light"
                        >
                            Redefining African luxury through craftsmanship and contemporary design.
                        </motion.p>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="py-20 container mx-auto px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-3xl font-bold mb-6 text-secondary">The Dichengz Mission</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                At Dichengz, we believe that fashion is more than just clothing; it is a statement of identity, culture, and artistry. Our mission is to bridge the gap between traditional African aesthetics and modern global trends, creating pieces that are both timeless and avant-garde.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We are committed to sustainability, ethical production, and empowering local artisans. Every stitch tells a story of dedication, passion, and the rich heritage of our continent.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative h-[500px]">
                            <img
                                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop"
                                alt="Craftsmanship"
                                className="w-full h-full object-cover rounded-lg shadow-xl"
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Craftsmanship */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-secondary">Exquisite Craftsmanship</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Every piece in our collection is a testament to the skill and creativity of our master tailors and designers.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Premium Materials",
                                    desc: "We source only the finest fabrics, ensuring comfort, durability, and a luxurious feel.",
                                    img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop"
                                },
                                {
                                    title: "Attention to Detail",
                                    desc: "From precise cuts to intricate embroidery, no detail is too small to be perfected.",
                                    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop"
                                },
                                {
                                    title: "Timeless Design",
                                    desc: "Our designs transcend seasons, offering you a wardrobe that remains stylish for years.",
                                    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="h-48 mb-6 overflow-hidden rounded-md">
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-secondary">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default AboutPage;
