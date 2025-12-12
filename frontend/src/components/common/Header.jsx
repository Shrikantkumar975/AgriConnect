import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Marketplace', path: '/marketplace', roles: ['buyer', 'farmer', 'admin'] },
        { name: 'My Crops', path: '/my-crops', roles: ['farmer'] },
        { name: 'Add Crop', path: '/add-crop', roles: ['farmer'] },
        { name: 'Incoming Orders', path: '/farmer-orders', roles: ['farmer'] },
        { name: 'Cart', path: '/cart', roles: ['buyer'] },
        { name: 'My Orders', path: '/orders', roles: ['buyer'] },
        { name: 'Chat', path: '/chat', roles: ['buyer', 'farmer'] },
    ];

    const filteredLinks = navLinks.filter(link => link.roles.includes(user?.role));

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                            AgriConnect
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {filteredLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* User Menu / Login Buttons */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center border border-green-200 dark:border-green-800">
                                        {user?.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt={user.name}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-green-700 dark:text-green-300">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
                                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 animate-fadeIn">
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-full transition-colors shadow-lg shadow-green-600/20"
                                >
                                    Join Us
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none p-2"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 animate-slideDown">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {filteredLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
                            {user ? (
                                <>
                                    <div className="flex items-center px-3 mb-3">
                                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center border border-green-200 dark:border-green-800">
                                            <span className="text-sm font-bold text-green-700 dark:text-green-300">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800 dark:text-white">{user?.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
                                        </div>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Your Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-2 px-3">
                                    <Link
                                        to="/login"
                                        className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Join Us
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
