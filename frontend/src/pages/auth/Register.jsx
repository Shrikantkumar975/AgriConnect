import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaUser, FaTractor } from 'react-icons/fa';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { register: registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(location.state?.role || null);

    useEffect(() => {
        if (role) {
            setValue('role', role);
        }
    }, [role, setValue]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await registerUser({ ...data, role });
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `http://localhost:5000/api/auth/google?role=${role}`;
    };

    if (!role) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Join AgriConnect Pro
                        </h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            Choose how you want to join us
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {/* Farmer Card */}
                        <div
                            onClick={() => setRole('farmer')}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-500 group"
                        >
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4 group-hover:bg-green-600 transition-colors">
                                    <FaTractor className="h-12 w-12 text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">I am a Farmer</h3>
                                <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                                    Sell your produce directly to buyers and manage your farm.
                                </p>
                            </div>
                        </div>

                        {/* Buyer Card */}
                        <div
                            onClick={() => setRole('buyer')}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-500 group"
                        >
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 group-hover:bg-blue-600 transition-colors">
                                    <FaUser className="h-12 w-12 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">I am a Buyer</h3>
                                <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                                    Discover fresh crops and connect with local farmers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-green-600 hover:text-green-700 dark:text-green-400 font-medium">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className={`max-w-md w-full space-y-8 ${role === 'farmer' ? 'max-w-2xl' : ''}`}>
                <div>
                    <button
                        onClick={() => setRole(null)}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center"
                    >
                        ← Back to Role Selection
                    </button>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
                        Register as {role}
                    </h2>
                </div>

                <div className="mt-8 space-y-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <FaGoogle className="mr-2 text-red-500" />
                        Sign up with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">Or sign up with email</span>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('role')} />

                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    type="text"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <input
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                                    type="password"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                    placeholder="Create a password"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <input
                                    {...register('phone', { required: 'Phone is required' })}
                                    type="tel"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>

                        {role === 'farmer' && (
                            <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Farm Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Farm Name</label>
                                        <input
                                            {...register('farmDetails.farmName', { required: 'Farm Name is required' })}
                                            type="text"
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                            placeholder="Enter your farm name"
                                        />
                                        {errors.farmDetails?.farmName && <p className="text-red-500 text-xs mt-1">{errors.farmDetails.farmName.message}</p>}
                                    </div>
                                    {/* Additional fields can be added here if needed */}
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <Link to="/login" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
