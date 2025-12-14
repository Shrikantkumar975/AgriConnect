const mongoose = require('mongoose');

const storageRequestSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    cropName: {
        type: String,
        required: [true, 'Please add the crop name']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add the quantity in kg']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add the start date']
    },
    durationDays: {
        type: Number,
        required: [true, 'Please add the duration in days']
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StorageRequest', storageRequestSchema);
