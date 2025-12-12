import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

const AddCrop = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [cropId, setCropId] = useState(null);

    // Parse edit param
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const editId = params.get('edit');
        if (editId) {
            setEditMode(true);
            setCropId(editId);
            fetchCropDetails(editId);
        }
    }, [location]);

    const fetchCropDetails = async (id) => {
        try {
            const res = await api.get(`/crops/${id}`);
            const crop = res.data.data;

            // Populate form
            const fields = ['name', 'category', 'variety', 'description', 'price', 'unit', 'availableQuantity', 'minimumOrder', 'isOrganic'];
            fields.forEach(field => setValue(field, crop[field]));
        } catch (error) {
            console.error('Error fetching crop:', error);
            toast.error('Failed to load crop details');
        }
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            images.forEach(image => formData.append('images', image));

            if (editMode) {
                await api.put(`/crops/${cropId}`, formData);
                toast.success('Crop updated successfully!');
            } else {
                await api.post('/crops', formData);
                toast.success('Crop added successfully!');
            }

            navigate('/my-crops');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save crop');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{editMode ? 'Edit Crop' : 'Add New Crop'}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors duration-300">

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Crop Name</label>
                    <input
                        {...register('name', { required: 'Crop Name is required' })}
                        type="text"
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select
                            {...register('category', { required: 'Category is required' })}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">Select Category</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Grains">Grains</option>
                            <option value="Pulses">Pulses</option>
                            <option value="Spices">Spices</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Variety</label>
                        <input
                            {...register('variety')}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (₹)</label>
                        <input
                            {...register('price', { required: 'Price is required', min: 0 })}
                            type="number"
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
                        <select
                            {...register('unit', { required: 'Unit is required' })}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="kg">kg</option>
                            <option value="quintal">quintal</option>
                            <option value="ton">ton</option>
                            <option value="piece">piece</option>
                            <option value="dozen">dozen</option>
                        </select>
                        {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Available Quantity</label>
                        <input
                            {...register('availableQuantity', { required: 'Quantity is required', min: 0 })}
                            type="number"
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        {errors.availableQuantity && <p className="text-red-500 text-xs mt-1">{errors.availableQuantity.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Order</label>
                        <input
                            {...register('minimumOrder', { min: 1 })}
                            type="number"
                            defaultValue={1}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        {...register('isOrganic')}
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Is Organic?
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 dark:file:bg-green-900 file:text-green-700 dark:file:text-green-300 hover:file:bg-green-100 dark:hover:file:bg-green-800"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                    >
                        {isLoading ? 'Processing...' : (editMode ? 'Update Crop' : 'Add Crop')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCrop;
