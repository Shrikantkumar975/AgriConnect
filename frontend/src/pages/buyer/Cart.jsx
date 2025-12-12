import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Cart = () => {
    const { cart, loading, updateQuantity, removeFromCart, fetchCart } = useContext(CartContext);
    const [checkingOut, setCheckingOut] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
    });
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [paymentIds, setPaymentIds] = useState([]);

    // Calculate Total
    const totalAmount = cart?.items?.reduce((acc, item) => acc + (item.crop.price * item.quantity), 0) || 0;

    const handleQuantityChange = async (itemId, newQty, minOrder, maxStock) => {
        if (newQty < 1) return;
        if (newQty < minOrder) {
            alert(`Minimum order quantity is ${minOrder}`);
            return;
        }
        if (newQty > maxStock) {
            alert(`Only ${maxStock} units available`);
            return;
        }
        await updateQuantity(itemId, newQty);
    };

    const handleRemove = async (itemId) => {
        if (window.confirm('Remove this item from cart?')) {
            await removeFromCart(itemId);
        }
    };

    const handleCheckoutChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        if (!cart?.items?.length) return;

        try {
            const res = await api.post('/orders', { shippingAddress });
            if (res.data.success) {
                // Instead of redirecting immediately, show payment modal
                setPaymentIds(res.data.orderIds); // Make sure backend returns orderIds
                setCheckingOut(false);
                setShowPaymentModal(true);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Order creation failed');
        }
    };

    const handlePayment = async () => {
        setProcessingPayment(true);
        try {
            const res = await api.post('/payment/mock-process', { orderIds: paymentIds });
            if (res.data.success) {
                // Wait a bit for effect
                setTimeout(() => {
                    alert('Payment Successful!');
                    fetchCart();
                    navigate('/orders');
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            alert('Payment failed. Please try again.');
            setProcessingPayment(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading cart...</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Cart is Empty</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added any crops yet.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Browse Marketplace
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4">
                            <div className="h-24 w-24 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                                {item.crop.images?.[0] ? (
                                    <img src={item.crop.images[0]} alt={item.crop.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400">No Img</div>
                                )}
                            </div>
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.crop.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Farmer: {item.crop.farmer?.name}</p>
                                <p className="text-green-600 font-bold mt-1">₹{item.crop.price} / {item.crop.unit}</p>
                                <div className="text-xs text-gray-500 mt-1 space-y-1">
                                    <p>Min Order: {item.crop.minimumOrder} {item.crop.unit}</p>
                                    <p className={`${(item.crop.availableQuantity - item.quantity) < 5 ? 'text-red-500 font-bold' : ''}`}>
                                        Available to add: {Math.max(0, item.crop.availableQuantity - item.quantity)} {item.crop.unit}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.crop.minimumOrder, item.crop.availableQuantity)}
                                    disabled={item.quantity <= item.crop.minimumOrder}
                                >-</button>
                                <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                                <button
                                    className="p-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.crop.minimumOrder, item.crop.availableQuantity)}
                                    disabled={item.quantity >= item.crop.availableQuantity}
                                >+</button>
                            </div>
                            <div className="text-right min-w-[80px]">
                                <p className="font-bold text-gray-800 dark:text-white">₹{item.crop.price * item.quantity}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Checkout Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Subtotal</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        {!checkingOut ? (
                            <button
                                onClick={() => setCheckingOut(true)}
                                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                            >
                                Proceed to Checkout
                            </button>
                        ) : (
                            <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-fadeIn">
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-4 border-t pt-4 dark:border-gray-700">Shipping Details</h3>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Street Address"
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                    value={shippingAddress.address}
                                    onChange={handleCheckoutChange}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                        value={shippingAddress.city}
                                        onChange={handleCheckoutChange}
                                    />
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="Pincode"
                                        className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                        value={shippingAddress.pincode}
                                        onChange={handleCheckoutChange}
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                    value={shippingAddress.state}
                                    onChange={handleCheckoutChange}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                    value={shippingAddress.phone}
                                    onChange={handleCheckoutChange}
                                />

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setCheckingOut(false)}
                                        className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Complete Payment</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Processing payment of ₹{totalAmount} via Demo Gateway.</p>

                        {processingPayment ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                                <p className="text-blue-600 font-semibold animate-pulse">Verifying Payment...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-left">
                                    <p className="font-mono text-sm dark:text-gray-300">Card: **** **** **** 4242</p>
                                    <p className="font-mono text-sm dark:text-gray-300">Exp: 12/28</p>
                                </div>
                                <button
                                    onClick={handlePayment}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Confirm Payment
                                </button>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="text-gray-500 hover:text-gray-700 text-sm underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
