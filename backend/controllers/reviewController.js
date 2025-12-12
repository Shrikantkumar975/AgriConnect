const Review = require('../models/Review');
const Crop = require('../models/Crop');
const Order = require('../models/Order');

// @desc    Get reviews
// @route   GET /api/reviews
// @route   GET /api/crops/:cropId/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
    try {
        if (req.params.cropId) {
            const reviews = await Review.find({ crop: req.params.cropId }).populate({
                path: 'user',
                select: 'name profilePicture'
            });

            return res.status(200).json({
                success: true,
                count: reviews.length,
                data: reviews
            });
        } else {
            res.status(400).json({ success: false, message: 'Please provide a crop ID' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Add review
// @route   POST /api/crops/:cropId/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
    try {
        req.body.crop = req.params.cropId;
        req.body.user = req.user.id;

        const crop = await Crop.findById(req.params.cropId);

        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        // Verify that user has purchased and received the item
        const hasPurchased = await Order.findOne({
            buyer: req.user.id,
            'items.crop': req.params.cropId,
            status: 'delivered'
        });

        if (!hasPurchased) {
            return res.status(403).json({
                success: false,
                message: 'You can only review products you have purchased and received.'
            });
        }

        // Check if user already reviewed
        const existingReview = await Review.findOne({
            user: req.user.id,
            crop: req.params.cropId
        });

        if (existingReview) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this crop' });
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
