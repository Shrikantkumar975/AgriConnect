const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Crop = require('../models/Crop');

// @desc    Create new order (Checkout)
// @route   POST /api/orders
// @access  Private (Buyer)
exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        // Fetch User's Cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.crop');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Check stock and gather update promises
        const updatePromises = [];

        // We will process items sequentially to ensure consistency
        for (const item of cart.items) {
            const crop = await Crop.findById(item.crop._id);

            if (!crop) {
                return res.status(404).json({ success: false, message: `Crop ${item.crop.name} not found` });
            }

            if (item.quantity > crop.availableQuantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${crop.name}. Only ${crop.availableQuantity} ${crop.unit} left.`
                });
            }

            // Prepare update
            crop.availableQuantity -= item.quantity;
            if (crop.availableQuantity === 0) {
                crop.status = 'out_of_stock';
            }
            updatePromises.push(crop.save());
        }

        // Execute stock updates
        await Promise.all(updatePromises);

        // Group items by Farmer
        const ordersByFarmer = {}; // { farmerId: { items: [], total: 0 } }

        for (const item of cart.items) {
            const farmerId = item.crop.farmer.toString();

            if (!ordersByFarmer[farmerId]) {
                ordersByFarmer[farmerId] = { items: [], totalAmount: 0 };
            }

            ordersByFarmer[farmerId].items.push({
                crop: item.crop._id,
                name: item.crop.name,
                price: item.crop.price,
                quantity: item.quantity,
                unit: item.crop.unit,
                image: item.crop.images?.[0]
            });

            ordersByFarmer[farmerId].totalAmount += item.crop.price * item.quantity;
        }

        const createdOrders = [];

        // Create an Order object for each farmer
        for (const farmerId in ordersByFarmer) {
            const orderData = ordersByFarmer[farmerId];

            const order = await Order.create({
                buyer: req.user.id,
                farmer: farmerId,
                items: orderData.items,
                totalAmount: orderData.totalAmount,
                shippingAddress: shippingAddress,
                status: 'pending',
                paymentStatus: 'pending' // Default
            });
            createdOrders.push(order);
        }

        // Clear Cart
        cart.items = [];
        await cart.save();

        const orderIds = createdOrders.map(o => o._id);
        res.status(201).json({ success: true, count: createdOrders.length, data: createdOrders, orderIds });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get my orders (Buyer)
// @route   GET /api/orders/myorders
// @access  Private (Buyer)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate('farmer', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get farmer's orders (Incoming)
// @route   GET /api/orders/farmerorders
// @access  Private (Farmer)
exports.getFarmerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ farmer: req.user.id })
            .populate('buyer', 'name email phone profilePicture')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private (Farmer/Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Make sure user is order farmer
        if (order.farmer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this order' });
        }

        order.status = req.body.status || order.status;
        if (req.body.paymentStatus && req.user.role === 'admin') {
            order.paymentStatus = req.body.paymentStatus;
        }

        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
