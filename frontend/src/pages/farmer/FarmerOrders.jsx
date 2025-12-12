import { useState, useEffect } from 'react';
import api from '../../services/api';

const FarmerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/farmerorders');
            setOrders(res.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}`, { status: newStatus });
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Incoming Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">No orders received yet.</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-800 dark:text-white">Order #{order._id.slice(-6)}</h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">from {order.buyer?.name}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        className={`px-3 py-1 rounded-md text-sm font-medium border-none focus:ring-2 focus:ring-green-500 outline-none
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <span className="font-bold text-gray-800 dark:text-white">₹{order.totalAmount}</span>
                                </div>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Items */}
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">Items</h4>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity} {item.unit} x ₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Shipping Info */}
                                <div>
                                    <h4 className="font-medium text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider mb-3">Shipping Address</h4>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        <p>{order.shippingAddress?.address}</p>
                                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                                        <p className="mt-2 text-gray-500">Phone: {order.shippingAddress?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FarmerOrders;
