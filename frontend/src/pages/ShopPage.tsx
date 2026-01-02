import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { getProducts, getCategories } from '../services/sanity';
import CloudinaryImage from '../components/CloudinaryImage';
import { Link } from 'react-router-dom';

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Mock data for now if API fails or returns empty
        const mockProducts = [
            { _id: '1', name: 'Jacket', price: 120, category: 'Men', slug: 'jacket', imageUrl: 'sample' },
            { _id: '2', name: 'Dress', price: 150, category: 'Women', slug: 'dress', imageUrl: 'sample' },
            { _id: '3', name: 'Sneakers', price: 90, category: 'Accessories', slug: 'sneakers', imageUrl: 'sample' },
            { _id: '4', name: 'Hoodie', price: 80, category: 'Men', slug: 'hoodie', imageUrl: 'sample' },
        ];

        setLoading(true);
        console.log('🔄 Fetching products and categories from Sanity...');

        Promise.all([getProducts(), getCategories()])
            .then(([productsData, categoriesData]) => {
                console.log('✅ Sanity Products:', productsData);
                console.log('✅ Sanity Categories:', categoriesData);

                if (productsData && productsData.length > 0) {
                    setProducts(productsData);
                    setFilteredProducts(productsData);
                    setError(null);
                } else {
                    console.warn('⚠️ No products in Sanity, using mock data');
                    setProducts(mockProducts);
                    setFilteredProducts(mockProducts);
                    setError('No products found in Sanity CMS');
                }

                if (categoriesData) {
                    setCategories(categoriesData);
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Sanity Error:', err);
                setError(err.message || 'Failed to fetch data');
                setProducts(mockProducts);
                setFilteredProducts(mockProducts);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = products;
        if (search) {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (category !== 'All') {
            result = result.filter(p => p.category === category);
        }
        setFilteredProducts(result);
    }, [search, category, products]);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Shop</h1>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-8">
                        <p className="text-lg">Loading products...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && !loading && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                        <p className="text-yellow-700">
                            <strong>Note:</strong> {error}. Showing sample products instead.
                        </p>
                        <p className="text-sm text-yellow-600 mt-2">
                            Check the browser console for details.
                        </p>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 p-2 rounded w-full md:w-1/3 focus:outline-none focus:border-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="border border-gray-300 p-2 rounded w-full md:w-1/4 focus:outline-none focus:border-primary"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.title}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <Link to={`/product/${product.slug}`} key={product._id} className="group">
                            <div className="bg-gray-100 aspect-square mb-4 relative overflow-hidden">
                                {product.imageUrl ? (
                                    <CloudinaryImage
                                        publicId={product.imageUrl}
                                        alt={product.name}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                )}
                            </div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-gray-500">${product.price.toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default ShopPage;
