import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <MainLayout>
            <div className="bg-white min-h-screen">
                <div className="bg-secondary text-white py-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-4"
                    >
                        Contact Us
                    </motion.h1>
                    <p className="text-lg font-light max-w-2xl mx-auto px-4">
                        We'd love to hear from you. Whether you have a question about our collection, need assistance with an order, or just want to say hello.
                    </p>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-secondary">Get in Touch</h2>
                            <div className="space-y-6 text-gray-600">
                                <div>
                                    <h3 className="font-semibold text-black mb-1">Email Us</h3>
                                    <p>support@dichengz.com</p>
                                    <p>press@dichengz.com</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-1">Call Us</h3>
                                    <p>+1 (555) 123-4567</p>
                                    <p className="text-sm text-gray-500">Mon-Fri, 9am - 6pm EST</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-1">Visit Us</h3>
                                    <p>123 Fashion Avenue</p>
                                    <p>New York, NY 10012</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-50 p-8 rounded-lg"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-colors"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-primary-dark transition-colors"
                                >
                                    Send Message
                                </button>
                                {status === 'success' && (
                                    <p className="text-green-600 text-center text-sm">Message sent successfully!</p>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ContactPage;
