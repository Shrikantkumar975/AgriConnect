const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
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
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.pre('save', async function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Cart', cartSchema);
