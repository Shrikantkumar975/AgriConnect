import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'buyer') {
            fetchCart();
        } else {
            setCart(null);
            setLoading(false);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart');
            setCart(res.data.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (cropId, quantity) => {
        try {
            const res = await api.post('/cart', { cropId, quantity });
            setCart(res.data.data);
            return { success: true };
        } catch (error) {
            console.error('Error adding to cart:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add to cart'
            };
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const res = await api.put(`/cart/${itemId}`, { quantity });
            setCart(res.data.data);
            return { success: true };
        } catch (error) {
            console.error('Error updating cart:', error);
            return { success: false, message: 'Failed to update quantity' };
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const res = await api.delete(`/cart/${itemId}`);
            setCart(res.data.data);
            return { success: true };
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false, message: 'Failed to remove from cart' };
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
