import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Marketplace = () => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCrops();
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [filters]);

    const fetchCrops = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
            if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
            if (filters.sortBy) {
                if (filters.sortBy.startsWith('-')) {
                    queryParams.append('sortBy', filters.sortBy.substring(1));
                    queryParams.append('order', 'desc');
                } else {
                    queryParams.append('sortBy', filters.sortBy);
                    queryParams.append('order', 'asc');
                }
            }

            const res = await api.get(`/crops?${queryParams.toString()}`);
            setCrops(res.data.data);
        } catch (error) {
            console.error('Error fetching crops:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Marketplace</h1>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 transition-colors duration-300">
                <input
                    type="text"
                    name="search"
                    placeholder="Search crops..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                />
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-500 focus:border-green-500"
                >
                    <option value="">All Categories</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Spices">Spices</option>
                </select>
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                />
                <select
                    name="sortBy"
                    value={filters.sortBy || 'createdAt'}
                    onChange={handleFilterChange}
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-500 focus:border-green-500"
                >
                    <option value="createdAt">Newest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                </select>
                <button
                    onClick={() => setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sortBy: 'createdAt' })}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                    Clear Filters
                </button>
            </div>

            {/* Crop Grid */}
            {loading ? (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map((crop) => (
                        <div key={crop._id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative group cursor-pointer">
                                <Link to={`/crop/${crop._id}`}>
                                    {crop.images && crop.images.length > 0 ? (
                                        <img src={crop.images[0]} alt={crop.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {crop.isOrganic && (
                                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                                            Organic
                                        </span>
                                    )}
                                    {crop.availableQuantity === 0 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                                            <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg transform -rotate-12 shadow-xl border-2 border-white/20">
                                                OUT OF STOCK
                                            </span>
                                        </div>
                                    )}
                                    {crop.availableQuantity > 0 && crop.availableQuantity < crop.minimumOrder && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                                            <div className="bg-orange-500 text-white font-bold px-4 py-2 rounded-lg transform -rotate-12 shadow-xl border-2 border-white/20 text-center">
                                                <span className="block text-sm">NOT ENOUGH</span>
                                                <span className="block text-xs">FOR MIN ORDER</span>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{crop.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{crop.variety}</p>
                                    </div>
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">₹{crop.price}/{crop.unit}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{crop.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="block">Min: {crop.minimumOrder} {crop.unit}</span>
                                        <span className="block">Avail: {crop.availableQuantity} {crop.unit}</span>
                                        {crop.availableQuantity > 0 && crop.availableQuantity <= 10 && (
                                            <span className="block text-red-600 font-bold text-xs mt-1">
                                                Only {crop.availableQuantity} {crop.unit} left!
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        {user?._id !== crop.farmer?._id && (
                                            <Link
                                                to="/chat"
                                                state={{
                                                    userId: crop.farmer?._id,
                                                    cropOfInterest: {
                                                        id: crop._id,
                                                        name: crop.name,
                                                        price: crop.price,
                                                        unit: crop.unit,
                                                        image: crop.images?.[0]
                                                    }
                                                }}
                                                className="text-white bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                            >
                                                Chat
                                            </Link>
                                        )}
                                        {user?.role === 'buyer' && (
                                            crop.availableQuantity === 0 ? (
                                                <button
                                                    disabled
                                                    className="text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed font-medium rounded-md text-sm px-4 py-2 flex items-center border border-gray-200 dark:border-gray-600"
                                                >
                                                    Out of Stock
                                                </button>
                                            ) : crop.availableQuantity < crop.minimumOrder ? (
                                                <button
                                                    disabled
                                                    className="text-orange-300 bg-orange-50 dark:bg-gray-700 cursor-not-allowed font-medium rounded-md text-sm px-4 py-2 flex items-center border border-orange-200 dark:border-gray-600"
                                                >
                                                    Stock Low
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(crop._id, Math.max(1, crop.minimumOrder)).then(res => {
                                                        if (res.success) alert('Added to cart!');
                                                        else alert(res.message);
                                                    })}
                                                    className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-3 py-1 flex items-center transition-colors shadow-sm"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Add
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
                                        {crop.farmer?.profilePicture && crop.farmer.profilePicture !== 'no-photo.jpg' ? (
                                            <img src={crop.farmer.profilePicture} alt={crop.farmer.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="flex items-center justify-center h-full w-full text-xs font-bold text-gray-600 dark:text-gray-300">
                                                {crop.farmer?.name?.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{crop.farmer?.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{crop.farmer?.farmDetails?.location?.district}, {crop.farmer?.farmDetails?.location?.state}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && crops.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">No crops found matching your criteria.</div>
            )}
        </div>
    );
};

export default Marketplace;
