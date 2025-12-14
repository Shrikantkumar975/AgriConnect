import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaWarehouse, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

const WarehouseList = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState(null); // For request modal
    const [myRequests, setMyRequests] = useState([]);
    const [showRequests, setShowRequests] = useState(false);
    const { user } = useContext(AuthContext); // Moved from modal to parent for requests fetching

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchWarehouses();
        if (user) {
            fetchMyRequests();
        }
    }, [filterType, user]); // Refetch when filter changes or user logs in

    const fetchMyRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${apiUrl}/api/storage-requests/my-requests`, config);
            setMyRequests(res.data);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        }
    };

    const fetchWarehouses = async () => {
        try {
            let query = `${apiUrl}/api/warehouses?`;
            if (searchTerm) query += `location=${searchTerm}&`;
            if (filterType) query += `storageType=${filterType}`;

            const res = await axios.get(query);
            setWarehouses(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch warehouses');
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWarehouses();
    };

    const openRequestModal = (warehouse) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.info('Please login to request storage');
            navigate('/login');
            return;
        }
        setSelectedWarehouse(warehouse);
    };

    const closeRequestModal = () => {
        setSelectedWarehouse(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Find Storage Facilities</h1>
                <p className="text-gray-600 dark:text-gray-300">Secure storage for your crops. Connect directly with improved warehouse owners.</p>
            </div>

            {/* My Requests Section */}
            {user && myRequests.length > 0 && (
                <div className="mb-8">
                    <button
                        onClick={() => setShowRequests(!showRequests)}
                        className="flex items-center text-lg font-semibold text-green-600 dark:text-green-400 hover:text-green-700 mb-4 focus:outline-none"
                    >
                        {showRequests ? 'Hide My Requests' : 'View My Requests'} ({myRequests.length})
                    </button>

                    {showRequests && (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-down">
                            {myRequests.map(request => (
                                <div key={request._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-l-4 border-green-500">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-800 dark:text-white">{request.warehouse?.name || 'Unknown Warehouse'}</h4>
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Crop:</span> {request.cropName}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Qty:</span> {request.quantity} kg</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Duration:</span> {request.durationDays} days</p>
                                    <p className="text-xs text-gray-500 mt-2">Requested on: {new Date(request.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-1/2">
                    <div className="relative w-full">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by city, state or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                    </div>
                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Search</button>
                </form>

                <div className="relative w-full md:w-1/4">
                    <FaFilter className="absolute left-3 top-3 text-gray-400" />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
                    >
                        <option value="">All Storage Types</option>
                        <option value="Dry Storage">Dry Storage</option>
                        <option value="Cold Storage">Cold Storage</option>
                        <option value="Silo">Silo</option>
                        <option value="Distribution Center">Distribution Center</option>
                    </select>
                </div>
            </div>

            {/* Warehouse Grid */}
            {isLoading ? (
                <div className="text-center">Loading warehouses...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {warehouses.length > 0 ? (
                        warehouses.map(warehouse => (
                            <div key={warehouse._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 flex flex-col">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                                    {warehouse.images && warehouse.images.length > 0 ? (
                                        <img src={warehouse.images[0]} alt={warehouse.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FaWarehouse className="text-6xl opacity-50" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        {warehouse.storageType}
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{warehouse.name}</h3>
                                        <span className="text-green-600 font-bold shrink-0">₹{warehouse.pricePerKgPerDay}<span className="text-xs text-gray-500 font-normal">/kg/day</span></span>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center">
                                        <FaMapMarkerAlt className="mr-1 text-red-500" /> {warehouse.location.city}, {warehouse.location.state}
                                    </p>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{warehouse.description}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-gray-500">Available</span>
                                            <span className="font-semibold text-gray-800 dark:text-white">{warehouse.availableCapacity} kg</span>
                                        </div>
                                        <button
                                            onClick={() => openRequestModal(warehouse)}
                                            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
                                        >
                                            Request Storage
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No warehouses found matching your criteria.
                        </div>
                    )}
                </div>
            )}

            {/* Request Modal */}
            {selectedWarehouse && (
                <StorageRequestModal
                    warehouse={selectedWarehouse}
                    onClose={closeRequestModal}
                    apiUrl={apiUrl}
                />
            )}
        </div>
    );
};

// Modal Component
const StorageRequestModal = ({ warehouse, onClose, apiUrl }) => {
    const { user } = useContext(AuthContext);
    // Note: Parent already imports AuthContext, but we keep it here for independence if needed 
    // or we can remove if we pass user as prop. Keeping it is fine.

    const [requestData, setRequestData] = useState({
        cropName: '',
        quantity: '',
        startDate: '',
        durationDays: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [myCrops, setMyCrops] = useState([]);

    useEffect(() => {
        if (user) {
            fetchMyCrops();
        }
    }, [user]);

    const fetchMyCrops = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // Fetch crops created by this farmer
            const res = await axios.get(`${apiUrl}/api/crops?farmer=${user._id}`, config);
            setMyCrops(res.data.data);
        } catch (error) {
            console.error("Failed to fetch my crops", error);
        }
    };

    // Calculate total
    const total = requestData.quantity && requestData.durationDays
        ? (parseInt(requestData.quantity) * parseInt(requestData.durationDays) * warehouse.pricePerKgPerDay)
        : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.post(`${apiUrl}/api/storage-requests`, {
                warehouseId: warehouse._id,
                ...requestData
            }, config);

            toast.success('Storage request sent successfully!');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to send request');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Request Storage</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-4">Requesting storage at <span className="font-semibold text-green-600">{warehouse.name}</span></p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Crop Name</label>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Crop</label>
                                {myCrops.length > 0 ? (
                                    <select
                                        required
                                        value={requestData.cropName}
                                        onChange={e => setRequestData({ ...requestData, cropName: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">-- Select a Crop --</option>
                                        {myCrops.map(crop => (
                                            <option key={crop._id} value={crop.name}>
                                                {crop.name} ({crop.availableQuantity}kg available)
                                            </option>
                                        ))}
                                        <option value="custom">Other (Type Manually)</option>
                                    </select>
                                ) : (
                                    <p className="text-sm text-gray-500 mb-2">No crops found. <span onClick={() => setRequestData({ ...requestData, cropName: 'custom' })} className="text-green-600 cursor-pointer">Type manually</span></p>
                                )}

                                {(requestData.cropName === 'custom' || (!requestData.cropName && myCrops.length === 0)) && (
                                    <input
                                        type="text"
                                        required={requestData.cropName === 'custom'}
                                        value={requestData.cropName === 'custom' ? '' : requestData.cropName}
                                        onChange={e => setRequestData({ ...requestData, cropName: e.target.value })}
                                        className="w-full mt-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Enter crop name"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity (kg)</label>
                                <input
                                    type="number"
                                    required
                                    max={warehouse.availableCapacity}
                                    value={requestData.quantity}
                                    onChange={e => setRequestData({ ...requestData, quantity: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Total kg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (Days)</label>
                                <input
                                    type="number"
                                    required
                                    value={requestData.durationDays}
                                    onChange={e => setRequestData({ ...requestData, durationDays: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Days"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                            <input
                                type="date"
                                required
                                value={requestData.startDate}
                                onChange={e => setRequestData({ ...requestData, startDate: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Estimated Cost:</span>
                            <span className="text-xl font-bold text-green-600">₹{total.toLocaleString()}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WarehouseList;
