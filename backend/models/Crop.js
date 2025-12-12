const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a crop name'],
        trim: true,
        text: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Other']
    },
    variety: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        text: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    unit: {
        type: String,
        required: [true, 'Please select a unit'],
        enum: ['kg', 'quintal', 'ton', 'piece', 'dozen']
    },
    minimumOrder: {
        type: Number,
        default: 1
    },
    availableQuantity: {
        type: Number,
        required: [true, 'Please add available quantity']
    },
    isOrganic: {
        type: Boolean,
        default: false
    },
    images: [String],
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        district: String,
        state: String
    },
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['available', 'out_of_stock', 'discontinued'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create index for search
cropSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Crop', cropSchema);
