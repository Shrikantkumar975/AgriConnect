import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AuthSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithToken } = useContext(AuthContext); // We might need to add this method or just set token

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // We need a way to log in with just a token in AuthContext
            // For now, I'll manually set it or implement loginWithToken
            localStorage.setItem('token', token);
            // Ideally call a context method to update state
            // Assuming AuthContext has a setUser/loadUser method or similar logic on mount
            window.location.href = '/'; // Simple reload to trigger AuthContext init
        } else {
            toast.error('Authentication failed');
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl">Authenticating...</div>
        </div>
    );
};

export default AuthSuccess;
