const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Crop',
            required: true
        },
        name: String,
        price: Number,
        quantity: Number,
        unit: String,
        image: String
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        address: String,
        city: String,
        state: String,
        pincode: String,
        phone: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
