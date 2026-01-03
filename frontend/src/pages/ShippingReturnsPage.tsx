import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const ShippingReturnsPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="bg-white min-h-screen">
                <div className="bg-gray-50 py-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-serif font-bold mb-4 text-secondary"
                    >
                        Shipping & Returns
                    </motion.h1>
                </div>

                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        {/* Shipping Policy */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-secondary border-b pb-2">Shipping Policy</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <h3 className="font-semibold text-black text-lg">Shipping Timelines</h3>
                                <p>
                                    We strive to process all orders within 1-2 business days. Once shipped, you can expect your order to arrive within:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>Domestic (USA):</strong> 3-5 business days</li>
                                    <li><strong>International:</strong> 7-14 business days</li>
                                </ul>
                                <p className="text-sm italic">Note: Custom or made-to-order items may require additional processing time, which will be noted on the product page.</p>

                                <h3 className="font-semibold text-black text-lg mt-6">Delivery Regions</h3>
                                <p>
                                    We currently ship to over 50 countries worldwide. Shipping costs are calculated at checkout based on your location and order weight.
                                </p>
                            </div>
                        </section>

                        {/* Returns Policy */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-secondary border-b pb-2">Returns & Refunds</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <h3 className="font-semibold text-black text-lg">Return Eligibility</h3>
                                <p>
                                    We accept returns within <strong>14 days</strong> of delivery. To be eligible for a return, your item must be:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Unused and in the same condition that you received it.</li>
                                    <li>In the original packaging with all tags attached.</li>
                                </ul>

                                <h3 className="font-semibold text-black text-lg mt-6">Return Process</h3>
                                <ol className="list-decimal pl-5 space-y-1">
                                    <li>Contact our support team at <a href="mailto:support@dichengz.com" className="text-primary hover:underline">support@dichengz.com</a> with your order number.</li>
                                    <li>We will provide you with a Return Merchandise Authorization (RMA) number and shipping instructions.</li>
                                    <li>Ship the item back to us using a trackable shipping service.</li>
                                </ol>

                                <h3 className="font-semibold text-black text-lg mt-6">Refunds</h3>
                                <p>
                                    Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
                                </p>
                            </div>
                        </section>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ShippingReturnsPage;
