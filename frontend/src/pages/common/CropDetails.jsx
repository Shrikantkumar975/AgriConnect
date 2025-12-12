import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FaStar, FaRegStar, FaUser, FaLeaf, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CropDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [crop, setCrop] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Review Form State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewSubmitting, setReviewSubmitting] = useState(false);

    useEffect(() => {
        fetchCropDetails();
        fetchReviews();
    }, [id]);

    const fetchCropDetails = async () => {
        try {
            const res = await api.get(`/crops/${id}`);
            if (res.data.success) {
                setCrop(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load crop details');
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/crops/${id}/reviews`);
            if (res.data.success) {
                setReviews(res.data.data);
            }
        } catch (error) {
            console.error("No reviews or error", error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewSubmitting(true);
        try {
            const res = await api.post(`/crops/${id}/reviews`, { rating, comment });
            if (res.data.success) {
                toast.success('Review added successfully!');
                setComment('');
                fetchReviews();
                fetchCropDetails(); // To update avg rating
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setReviewSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!crop) return <div className="text-center py-20">Crop not found</div>;

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Link to="/marketplace" className="text-green-600 hover:underline mb-4 inline-block">
                &larr; Back to Marketplace
            </Link>

            {/* Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 md:p-10 mb-10">
                {/* Image */}
                <div className="h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                        src={crop.images?.[0] || 'https://via.placeholder.com/500?text=Crop+Image'}
                        alt={crop.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{crop.name}</h1>
                            <div className="flex items-center text-yellow-400">
                                <FaStar />
                                <span className="ml-1 text-gray-700 dark:text-gray-300 font-bold">
                                    {crop.averageRating || 0}
                                </span>
                                <span className="text-gray-400 text-sm ml-1">({crop.totalReviews} reviews)</span>
                            </div>
                        </div>

                        <p className="text-xl text-green-600 dark:text-green-400 font-bold mb-4">
                            ₹{crop.price} / {crop.unit}
                        </p>

                        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                {crop.category}
                            </span>
                            {crop.isOrganic && (
                                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full flex items-center gap-1">
                                    <FaLeaf /> Organic
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {crop.description}
                        </p>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                                {crop.farmer?.profilePicture ? (
                                    <img src={crop.farmer.profilePicture} alt="Farmer" className="h-full w-full object-cover" />
                                ) : (
                                    <FaUser className="h-full w-full p-2 text-gray-500" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{crop.farmer?.name}</p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <FaMapMarkerAlt className="mr-1" />
                                    {crop.farmer?.farmDetails?.location?.district}, {crop.farmer?.farmDetails?.location?.state}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {user?.role === 'buyer' && (
                            <button
                                onClick={() => addToCart(crop._id, crop.minimumOrder || 1).then(res => toast(res.success ? 'Added!' : res.message))}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors"
                            >
                                Add to Cart
                            </button>
                        )}
                        {user?._id !== crop.farmer?._id && (
                            <Link
                                to="/chat"
                                state={{
                                    userId: crop.farmer?._id,
                                    cropOfInterest: {
                                        id: crop._id,
                                        name: crop.name,
                                        price: crop.price,
                                        unit: crop.unit,
                                        image: crop.images?.[0]
                                    }
                                }}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors text-center"
                            >
                                Chat to Farmer
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Review List */}
                <div className="md:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Customer Reviews</h3>
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet. Be the first!</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {review.user?.name?.charAt(0)}
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-white">{review.user?.name}</span>
                                    </div>
                                    <div className="flex text-yellow-400 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                                <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Add Review Form */}
                <div className="md:col-span-1">
                    {user?.role === 'buyer' ? (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow sticky top-24 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`text-2xl focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                                    <textarea
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-500 focus:border-green-500"
                                        placeholder="Share your experience..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={reviewSubmitting}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {reviewSubmitting ? 'Posting...' : 'Post Review'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
                            {user ? (
                                <p className="text-gray-600 dark:text-gray-300">Farmers cannot review products.</p>
                            ) : (
                                <p>
                                    <Link to="/login" className="text-green-600 font-bold hover:underline">
                                        Login
                                    </Link> to write a review.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropDetails;
