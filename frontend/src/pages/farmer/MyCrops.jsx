import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const MyCrops = () => {
    const { user } = useContext(AuthContext);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyCrops = async () => {
            try {
                // Fetch crops where farmer = user._id
                // We enabled this filter in the backend controller
                const res = await api.get(`/crops?farmer=${user._id}`);
                setCrops(res.data.data);
            } catch (error) {
                console.error("Error fetching my crops:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyCrops();
        }
    }, [user]);

    const handleDelete = async (cropId) => {
        if (window.confirm('Are you sure you want to delete this crop info?')) {
            try {
                await api.delete(`/crops/${cropId}`);
                setCrops(crops.filter(crop => crop._id !== cropId));
            } catch (error) {
                console.error("Error deleting crop:", error);
                alert("Failed to delete crop");
            }
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-600 dark:text-gray-400">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Crops</h1>
                <Link
                    to="/add-crop"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-green-200 dark:shadow-none"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Crop
                </Link>
            </div>

            {crops.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 transition-colors duration-300">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 mb-4">
                        <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No crops listed yet</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by listing your first crop for sale.</p>
                    <div className="mt-6">
                        <Link to="/add-crop" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                            Create listing &rarr;
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map((crop) => (
                        <div key={crop._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 group">
                            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                                {crop.images && crop.images.length > 0 ? (
                                    <img
                                        src={crop.images[0]}
                                        alt={crop.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded text-xs font-bold shadow-sm uppercase tracking-wide">
                                    {crop.status}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{crop.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{crop.category}</p>
                                    </div>
                                    <span className="text-green-700 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                        ₹{crop.price}/{crop.unit}
                                    </span>
                                </div>

                                <div className="mt-4 flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <Link
                                        to={`/add-crop?edit=${crop._id}`}
                                        className="flex-1 text-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(crop._id)}
                                        className="flex-1 text-center bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCrops;
