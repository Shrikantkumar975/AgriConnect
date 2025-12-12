import { useState, useEffect } from 'react';
import api from '../../services/api';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/myorders');
            setOrders(res.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">You haven't placed any orders yet.</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Order ID: <span className="font-mono text-gray-700 dark:text-gray-300">#{order._id.slice(-6)}</span></p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                    <span className="font-bold text-gray-800 dark:text-white">₹{order.totalAmount}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sold by: {order.farmer?.name}</h4>
                                </div>
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">No img</div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-medium text-gray-800 dark:text-white">{item.name}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.quantity} {item.unit} x ₹{item.price}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-800 dark:text-white">₹{item.quantity * item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
