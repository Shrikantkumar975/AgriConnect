import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaPlus, FaBox, FaMapMarkerAlt, FaThermometerHalf, FaCheck, FaTimes } from 'react-icons/fa';

const WarehouseOwnerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [requests, setRequests] = useState({}); // Map warehouseId -> requests
    const [expandedWarehouse, setExpandedWarehouse] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        storageType: 'Dry Storage',
        totalCapacity: '',
        pricePerKgPerDay: '',
        description: '',
        amenities: ''
    });

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchMyWarehouses();
    }, []);

    const fetchMyWarehouses = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${apiUrl}/api/warehouses/my/warehouses`, config);
            setWarehouses(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch warehouses');
            setIsLoading(false);
        }
    };

    const fetchRequests = async (warehouseId) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`${apiUrl}/api/storage-requests/warehouse/${warehouseId}`, config);
            setRequests(prev => ({ ...prev, [warehouseId]: res.data }));
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch requests');
        }
    };

    const toggleExpand = (warehouseId) => {
        if (expandedWarehouse === warehouseId) {
            setExpandedWarehouse(null);
        } else {
            setExpandedWarehouse(warehouseId);
            if (!requests[warehouseId]) {
                fetchRequests(warehouseId);
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Format location object
            const warehouseData = {
                ...formData,
                location: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                amenities: formData.amenities.split(',').map(item => item.trim())
            };

            await axios.post(`${apiUrl}/api/warehouses`, warehouseData, config);
            toast.success('Warehouse created successfully');
            setShowAddForm(false);
            fetchMyWarehouses();
            setFormData({
                name: '', address: '', city: '', state: '', pincode: '',
                storageType: 'Dry Storage', totalCapacity: '', pricePerKgPerDay: '',
                description: '', amenities: ''
            });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to create warehouse');
        }
    };

    const handleRequestStatus = async (requestId, warehouseId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${apiUrl}/api/storage-requests/${requestId}/status`, { status: newStatus }, config);
            toast.success(`Request ${newStatus}`);
            fetchRequests(warehouseId); // Refresh requests
            fetchMyWarehouses(); // Refresh capacity
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">my Warehouses</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    <FaPlus className="mr-2" /> Add Warehouse
                </button>
            </div>

            {showAddForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Warehouse</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Warehouse Name" className="input-field" required />
                        <select name="storageType" value={formData.storageType} onChange={handleInputChange} className="input-field">
                            <option>Dry Storage</option>
                            <option>Cold Storage</option>
                            <option>Silo</option>
                            <option>Distribution Center</option>
                        </select>
                        <input name="totalCapacity" type="number" value={formData.totalCapacity} onChange={handleInputChange} placeholder="Total Capacity (kg)" className="input-field" required />
                        <input name="pricePerKgPerDay" type="number" value={formData.pricePerKgPerDay} onChange={handleInputChange} placeholder="Price/kg/day (₹)" className="input-field" required />

                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="input-field" required />
                            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="input-field" required />
                            <input name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="input-field" required />
                            <input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="input-field" required />
                        </div>

                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="input-field col-span-2" />
                        <input name="amenities" value={formData.amenities} onChange={handleInputChange} placeholder="Amenities (comma separated)" className="input-field col-span-2" />

                        <div className="col-span-2 flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Warehouse</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-6">
                {warehouses.map(warehouse => (
                    <div key={warehouse._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                                        <FaBox className="mr-2 text-green-600" /> {warehouse.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                                        <FaMapMarkerAlt className="mr-2" /> {warehouse.location.city}, {warehouse.location.state}
                                    </p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full mr-2">{warehouse.storageType}</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">₹{warehouse.pricePerKgPerDay}/kg/day</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Available Capacity</p>
                                    <p className="text-2xl font-bold text-green-600">{warehouse.availableCapacity} / {warehouse.totalCapacity} kg</p>
                                </div>
                            </div>

                            <button
                                onClick={() => toggleExpand(warehouse._id)}
                                className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            >
                                {expandedWarehouse === warehouse._id ? 'Hide Requests' : 'View Requests'}
                            </button>
                        </div>

                        {expandedWarehouse === warehouse._id && (
                            <div className="bg-gray-50 dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Storage Requests</h4>
                                {requests[warehouse._id]?.length === 0 ? (
                                    <p className="text-gray-500">No requests yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {requests[warehouse._id]?.map(request => (
                                            <div key={request._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-white">{request.farmer.name} - {request.cropName}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {request.quantity}kg for {request.durationDays} days | Total: ₹{request.totalPrice}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Starting: {new Date(request.startDate).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleRequestStatus(request._id, warehouse._id, 'approved')}
                                                                className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Approve"
                                                            >
                                                                <FaCheck />
                                                            </button>
                                                            <button
                                                                onClick={() => handleRequestStatus(request._id, warehouse._id, 'rejected')}
                                                                className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Reject"
                                                            >
                                                                <FaTimes />
                                                            </button>
                                                        </>
                                                    )}
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                                        ${request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            request.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {warehouses.length === 0 && !showAddForm && (
                    <div className="text-center py-12 text-gray-500 bg-white dark:bg-gray-800 rounded-lg">
                        You haven't listed any warehouses yet.
                    </div>
                )}
            </div>

            <style>{`
                .input-field {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    background-color: transparent;
                    color: inherit;
                }
                .dark .input-field {
                    border-color: #4a5568;
                }
                /* Fix for select options in dark mode */
                .dark select.input-field option {
                    background-color: #1f2937;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default WarehouseOwnerDashboard;
