import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getProduct } from '../services/sanity';
import CloudinaryImage from '../components/CloudinaryImage';
import { useCart } from '../context/CartContext';
import LoadingScreen from '../components/LoadingScreen';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        if (slug) {
            setLoading(true);
            getProduct(slug)
                .then(data => {
                    console.log('Product data:', data);
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching product:', err);
                    setLoading(false);
                });
        }
    }, [slug]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!product) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <p className="text-center">Product not found</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        {product.imageUrl ? (
                            <div className="bg-gray-100 aspect-square mb-4">
                                <CloudinaryImage
                                    publicId={product.imageUrl}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-200 aspect-square mb-4 flex items-center justify-center text-gray-400">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2 uppercase">{product.category}</p>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-2xl font-semibold text-primary mb-6">
                            {product.price ? `KSH ${product.price.toFixed(2)}` : 'Price not available'}
                        </p>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>

                        <button
                            onClick={() => addToCart({
                                sku: product._id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                image: product.imageUrl || '',
                                size: 'Standard', // Default size
                                color: 'Standard' // Default color
                            })}
                            className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition w-full md:w-auto"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductDetailPage;
