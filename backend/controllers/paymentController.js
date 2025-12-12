const Order = require('../models/Order');

// @desc    Process Mock Payment (Demo)
// @route   POST /api/payment/mock-process
// @access  Private (Buyer)
exports.processMockPayment = async (req, res) => {
    try {
        const { orderIds } = req.body;

        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
            return res.status(400).json({ success: false, message: 'No Order IDs provided' });
        }

        // Simulate delay (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update all orders to 'paid'
        // In a real scenario, we'd verify amounts etc.
        await Order.updateMany(
            { _id: { $in: orderIds }, buyer: req.user.id },
            {
                $set: {
                    paymentStatus: 'paid',
                    status: 'confirmed' // Auto-confirm for demo
                }
            }
        );

        res.status(200).json({
            success: true,
            message: 'Payment simulated successfully'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
