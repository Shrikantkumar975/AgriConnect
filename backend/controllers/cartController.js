const Cart = require('../models/Cart');
const Crop = require('../models/Crop');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private (Buyer)
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate({
            path: 'items.crop',
            select: 'name price unit images farmer availableQuantity minimumOrder', // Include farmer to help with checkout grouping
            populate: {
                path: 'farmer',
                select: 'name farmDetails.location'
            }
        });

        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private (Buyer)
exports.addToCart = async (req, res) => {
    try {
        const { cropId, quantity } = req.body;
        const qty = parseInt(quantity);

        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
        }

        if (qty > crop.availableQuantity) {
            return res.status(400).json({ success: false, message: `Only ${crop.availableQuantity} units available` });
        }

        if (crop.availableQuantity < crop.minimumOrder) {
            return res.status(400).json({ success: false, message: `Stock (${crop.availableQuantity}) is less than Minimum Order (${crop.minimumOrder}). Cannot purchase.` });
        }

        if (qty < crop.minimumOrder) {
            return res.status(400).json({ success: false, message: `Minimum order for this crop is ${crop.minimumOrder} ${crop.unit}` });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [{ crop: cropId, quantity: qty }]
            });
        } else {
            // Check if item exists
            const itemIndex = cart.items.findIndex(p => p.crop.toString() === cropId);

            if (itemIndex > -1) {
                // Update quantity
                cart.items[itemIndex].quantity += qty;
            } else {
                // Add new item
                cart.items.push({ crop: cropId, quantity: qty });
            }
            await cart.save();
        }

        const fullCart = await Cart.findOne({ user: req.user.id }).populate({
            path: 'items.crop',
            select: 'name price unit images farmer availableQuantity minimumOrder',
            populate: { path: 'farmer', select: 'name' }
        });

        res.status(200).json({ success: true, data: fullCart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private (Buyer)
exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const qty = parseInt(quantity);

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(p => p._id.toString() === req.params.itemId);
        if (itemIndex > -1) {
            if (qty <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = qty;
            }
            await cart.save();

            // Re-fetch to populate
            cart = await Cart.findOne({ user: req.user.id }).populate({
                path: 'items.crop',
                select: 'name price unit images farmer availableQuantity minimumOrder',
                populate: { path: 'farmer', select: 'name' }
            });

            return res.status(200).json({ success: true, data: cart });
        } else {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private (Buyer)
exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();

        cart = await Cart.findOne({ user: req.user.id }).populate({
            path: 'items.crop',
            select: 'name price unit images farmer availableQuantity minimumOrder',
            populate: { path: 'farmer', select: 'name' }
        });

        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
