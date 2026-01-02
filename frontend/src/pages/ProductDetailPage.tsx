import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getProduct } from '../services/sanity';
import CloudinaryImage from '../components/CloudinaryImage';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
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
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <p className="text-center">Loading product...</p>
                </div>
            </MainLayout>
        );
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

    // Get all images from all variants
    const allImages = product.variants?.flatMap((v: any) => v.images || []).filter(Boolean) || [];
    const currentImage = allImages[selectedImage];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        {currentImage ? (
                            <div className="bg-gray-100 aspect-square mb-4">
                                <CloudinaryImage
                                    publicId={currentImage}
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

                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {allImages.map((img: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square bg-gray-100 overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-transparent'
                                            }`}
                                    >
                                        <CloudinaryImage
                                            publicId={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            width={150}
                                            height={150}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-2xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>

                        {product.description && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-gray-600">{product.description}</p>
                            </div>
                        )}

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Available Variants</h3>
                                <div className="space-y-2">
                                    {product.variants.map((variant: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 text-sm">
                                            {variant.color && <span className="text-gray-600">Color: <strong>{variant.color}</strong></span>}
                                            {variant.size && <span className="text-gray-600">Size: <strong>{variant.size}</strong></span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => addToCart({
                                sku: product._id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                image: currentImage || '',
                                size: product.variants?.[0]?.size || '',
                                color: product.variants?.[0]?.color || ''
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
