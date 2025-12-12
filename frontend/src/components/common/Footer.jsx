import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            AgriConnect
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Empowering farmers, connecting communities, and fresh produce directly from the source.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm-1.634 1.562c-2.617 0-2.888.01-3.773.047-.922.037-1.57.193-2.146.416-.594.232-1.096.535-1.597 1.036-.502.501-.805 1.002-1.037 1.596-.223.576-.379 1.225-.416 2.147-.04.885-.05 1.156-.05 3.773 0 2.617.01 2.888.05 3.773.037.922.193 1.57.416 2.146.232.594.535 1.096 1.036 1.597.501.502 1.002.805 1.597 1.036.576.223 1.225.379 2.146.416.885.04 1.156.05 3.773.05 2.617 0 2.888-.01 3.773-.05.922-.037 1.57-.193 2.146-.416.594-.232 1.096-.535 1.597-1.036.502-.501.805-1.002 1.036-1.597.223-.576.379-1.225.416-2.146.04-.885.05-1.156.05-3.773s-.01-2.888-.05-3.773c-.037-.922-.193-1.57-.416-2.146-.232-.594-.535-1.096-1.036-1.597-.501-.502-1.002-.805-1.597-1.036-.576-.223-1.225-.379-2.146-.416-.885-.04-1.156-.05-3.773-.05zm0 3.773a5.415 5.415 0 110 10.83 5.415 5.415 0 010-10.83zm0 1.562a3.853 3.853 0 100 7.707 3.853 3.853 0 000-7.707zm7.42-3.328a1.04 1.04 0 11-2.08 0 1.04 1.04 0 012.08 0z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Marketplace</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Sell Produce</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Community</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Safety Guide</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Subscribe to our newsletter for latest farming tips.</p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-lg shadow-green-200 dark:shadow-none"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center sm:flex sm:justify-between sm:text-left">
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        © {new Date().getFullYear()} AgriConnect. All rights reserved.
                    </p>
                    <div className="mt-4 sm:mt-0 flex justify-center space-x-6">
                        <a href="#" className="text-sm text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400">Terms</a>
                        <a href="#" className="text-sm text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400">Privacy</a>
                        <a href="#" className="text-sm text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
