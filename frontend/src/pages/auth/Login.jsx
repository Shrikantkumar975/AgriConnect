import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaUser, FaTractor } from 'react-icons/fa';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login({ email: data.email, password: data.password });
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to backend Google Auth with Role
        window.location.href = `http://localhost:5000/api/auth/google?role=${role}`;
    };

    if (!role) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Welcome Back!
                        </h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            Please select your role to continue
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
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Farmer</h3>
                                <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                                    Login to manage your crops and reach buyers.
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
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Buyer</h3>
                                <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                                    Login to explore fresh produce and connect with farmers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <Link to="/register" className="text-green-600 hover:text-green-700 dark:text-green-400 font-medium">
                            Don't have an account? Create one
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <button
                        onClick={() => setRole(null)}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center"
                    >
                        ← Back to Role Selection
                    </button>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
                        {role} Login
                    </h2>
                </div>

                <div className="mt-8 space-y-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <FaGoogle className="mr-2 text-red-500" />
                        Sign in with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    {...register('email', { required: 'Email is required' })}
                                    type="email"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                    placeholder="Email address"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <input
                                    {...register('password', { required: 'Password is required' })}
                                    type="password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                                    placeholder="Password"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <Link to="/register" state={{ role }} className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
