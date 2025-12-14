const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a warehouse name'],
        trim: true,
        text: true
    },
    location: {
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        city: {
            type: String,
            required: [true, 'Please add a city']
        },
        state: {
            type: String,
            required: [true, 'Please add a state']
        },
        pincode: {
            type: String,
            required: [true, 'Please add a pincode']
        },
        // Geospatial data for location-based search
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere'
        }
    },
    storageType: {
        type: String,
        required: [true, 'Please select storage type'],
        enum: ['Cold Storage', 'Dry Storage', 'Silo', 'Distribution Center', 'Other']
    },
    totalCapacity: {
        type: Number,
        required: [true, 'Please add total capacity in kg']
    },
    availableCapacity: {
        type: Number,
        required: [true, 'Please add available capacity in kg']
    },
    pricePerKgPerDay: {
        type: Number,
        required: [true, 'Please add price per kg per day']
    },
    amenities: [String], // e.g. ["CCTV", "Humidity Control", "Pest Control"]
    images: [String],
    description: String,

    // Ratings
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
