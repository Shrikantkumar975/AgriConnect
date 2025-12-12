import { useState, useContext, useEffect } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const { user, login } = useContext(AuthContext);

    const [stats, setStats] = useState({
        memberSince: '',
        role: ''
    });
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        farmDetails: {
            farmName: '',
            farmSize: '',
            location: {
                address: '',
                district: '',
                state: '',
                pincode: ''
            }
        }
    });

    useEffect(() => {
        if (user) {
            setStats({
                memberSince: new Date(user.createdAt || Date.now()).toLocaleDateString(),
                role: user.role.charAt(0).toUpperCase() + user.role.slice(1)
            });
            setEditForm({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                farmDetails: {
                    farmName: user.farmDetails?.farmName || '',
                    farmSize: user.farmDetails?.farmSize || '',
                    location: {
                        address: user.farmDetails?.location?.address || '',
                        district: user.farmDetails?.location?.district || '',
                        state: user.farmDetails?.location?.state || '',
                        pincode: user.farmDetails?.location?.pincode || ''
                    }
                }
            });
        }
    }, [user]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        setUploading(true);
        try {
            await api.put('/auth/updatedetails', formData);
            window.location.reload();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.message || 'Failed to update profile picture';
            alert(typeof errMsg === 'object' ? JSON.stringify(errMsg) : errMsg);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = async () => {
        if (!window.confirm('Are you sure you want to remove your profile picture?')) return;

        setUploading(true);
        try {
            await api.put('/auth/updatedetails', { removeProfilePicture: true });
            window.location.reload();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.message || 'Failed to remove profile picture';
            alert(typeof errMsg === 'object' ? JSON.stringify(errMsg) : errMsg);
        } finally {
            setUploading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('farmDetails.')) {
            const field = name.split('.')[1];
            if (field === 'location') {
                const locField = name.split('.')[2];
                setEditForm(prev => ({
                    ...prev,
                    farmDetails: {
                        ...prev.farmDetails,
                        location: {
                            ...prev.farmDetails.location,
                            [locField]: value
                        }
                    }
                }));
            } else {
                setEditForm(prev => ({
                    ...prev,
                    farmDetails: {
                        ...prev.farmDetails,
                        [field]: value
                    }
                }));
            }
        } else {
            setEditForm({ ...editForm, [name]: value });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/auth/updatedetails', editForm);
            setIsEditing(false);
            window.location.reload(); // Reload to fetch fresh user data
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to update profile');
        }
    };

    if (!user) return <div className="p-8 text-center text-gray-600 dark:text-gray-400">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8 transition-colors duration-300">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="group relative h-24 w-24 rounded-full bg-white dark:bg-gray-800 p-1 shadow-md cursor-pointer transition-colors duration-300">
                                <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden relative">
                                    {user.profilePicture && user.profilePicture !== 'no-photo.jpg' ? (
                                        <img src={user.profilePicture} alt={user.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">{user.name.charAt(0).toUpperCase()}</span>
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Remove Button - Only show if not default image and in edit mode */}
                                {isEditing && user.profilePicture && user.profilePicture !== 'no-photo.jpg' && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleRemoveImage();
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors z-20"
                                        title="Remove profile picture"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    disabled={uploading}
                                />
                            </div>
                            <span className={`px-4 py-1 rounded-full text-sm font-medium ${user.role === 'farmer' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                }`}>
                                {stats.role}
                            </span>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                disabled={!!user.googleId}
                                                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${user.googleId ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                required
                                            />
                                            {user.googleId && (
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {user.googleId && <p className="text-xs text-gray-500 mt-1">Email cannot be changed for Google accounts.</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {user.role === 'farmer' && (
                                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Farm Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Farm Name</label>
                                                <input
                                                    type="text"
                                                    name="farmDetails.farmName"
                                                    value={editForm.farmDetails.farmName}
                                                    onChange={handleEditChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Farm Size (Acres)</label>
                                                <input
                                                    type="number"
                                                    name="farmDetails.farmSize"
                                                    value={editForm.farmDetails.farmSize}
                                                    onChange={handleEditChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    name="farmDetails.location.address"
                                                    value={editForm.farmDetails.location.address}
                                                    onChange={handleEditChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District</label>
                                                <input
                                                    type="text"
                                                    name="farmDetails.location.district"
                                                    value={editForm.farmDetails.location.district}
                                                    onChange={handleEditChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                                                <input
                                                    type="text"
                                                    name="farmDetails.location.state"
                                                    value={editForm.farmDetails.location.state}
                                                    onChange={handleEditChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
                                                <input
                                                    type="text"
                                                    name="farmDetails.location.pincode"
                                                    value={editForm.farmDetails.location.pincode}
                                                    onChange={handleEditChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Joined {stats.memberSince}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span>{user.phone || 'No phone number added'}</span>
                                        </div>
                                    </div>
                                </div>

                                {user.role === 'farmer' && user.farmDetails && (
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Farm Details</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Farm Size</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-200">{user.farmDetails.size} acres</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Location</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-200 text-right">
                                                    {user.farmDetails.location?.address},<br />
                                                    {user.farmDetails.location?.district}, {user.farmDetails.location?.state}
                                                </span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                                                <span className="text-gray-500 dark:text-gray-400 block mb-1">Crops Grown</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.farmDetails.cropsGrown?.map((crop, idx) => (
                                                        <span key={idx} className="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-200">
                                                            {crop}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {uploading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-gray-800 dark:text-white font-medium">Updating profile picture...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
