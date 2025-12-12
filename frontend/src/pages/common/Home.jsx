import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [featuredCrops, setFeaturedCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                // Fetch public crops
                const res = await api.get('/crops');
                if (res.data.success) {
                    // Take first 3 for display
                    setFeaturedCrops(res.data.data.slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to fetch featured crops", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCrops();
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-300 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center justify-center text-center">

                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500 dark:from-green-400 dark:to-blue-400 mb-6 animate-fade-in-up">
                    Freshness Delivered
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Connect directly with local farmers. Fresh, organic, and sustainable produce delivered from the farm to your table.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link
                        to="/marketplace"
                        className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 hover:shadow-green-500/30 transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                    >
                        <span>🛒</span> Explore Marketplace
                    </Link>

                    {!user && (
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 font-bold rounded-lg shadow-lg border border-green-100 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300 text-lg"
                        >
                            Join as a Farmer
                        </Link>
                    )}
                </div>

                {/* Floating Imagery or Icon */}
                <div className="mt-16 animate-float">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-green-200 to-blue-200 dark:from-green-900 dark:to-blue-900 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm border border-white/20">
                        <span className="text-8xl">🌱</span>
                    </div>
                </div>
            </div>

            {/* Featured Crops Preview */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12 animate-fade-in-up">
                    Fresh from the Farm
                </h2>

                {loading ? (
                    <div className="text-center text-gray-500">Loading fresh picks...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCrops.map((crop, idx) => (
                            <div
                                key={crop._id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                style={{ animationDelay: `${idx * 0.2}s` }} // Staggered animation
                            >
                                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 relative">
                                    <img
                                        src={crop.images?.[0] || 'https://via.placeholder.com/300?text=Fresh+Crop'}
                                        alt={crop.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        ₹{crop.price}/{crop.unit}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{crop.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{crop.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            By {crop.farmer?.name}
                                        </span>
                                        <Link
                                            to="/marketplace"
                                            className="text-green-600 dark:text-green-400 font-semibold hover:underline text-sm"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Features Glassmorphism Cards */}
            <div className="relative z-10 container mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-gray-200 dark:border-gray-800 pt-16">
                {[
                    { title: "Direct from Farm", icon: "🌾", desc: "No middlemen. Just you and the farmer." },
                    { title: "Organic & Fresh", icon: "🍃", desc: "100% organic produce verified for quality." },
                    { title: "Fair Prices", icon: "🤝", desc: "Farmers get more, you pay less." }
                ].map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
