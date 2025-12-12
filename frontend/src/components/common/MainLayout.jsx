import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-16 animate-fadeIn">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
