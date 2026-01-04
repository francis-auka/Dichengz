import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { getShopItems } from '../services/sanity';
import CloudinaryImage from '../components/CloudinaryImage';
import { Link, useSearchParams } from 'react-router-dom';

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const [category, setCategory] = useState(initialCategory);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = ['Women', 'Men', 'Shoes', 'Bags', 'Accessories'];

    useEffect(() => {
        setLoading(true);
        console.log('🔄 Fetching shop products from Sanity...');

        getShopItems()
            .then((productsData) => {
                console.log('✅ Sanity Shop Products:', productsData);

                if (productsData && productsData.length > 0) {
                    setProducts(productsData);
                    setFilteredProducts(productsData);
                    setError(null);
                } else {
                    console.warn('⚠️ No products in Sanity');
                    setError('No products found in Sanity CMS');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Sanity Error:', err);
                setError(err.message || 'Failed to fetch data');
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
                            <strong>Note:</strong> {error}.
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
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link to={`/product/${product.slug}`} key={product._id} className="group block">
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
                                <p className="text-gray-500">KSH {product.price.toFixed(2)}</p>
                            </Link>
                        ))
                    ) : (
                        !loading && <p className="col-span-full text-center text-gray-500">No products found.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default ShopPage;
