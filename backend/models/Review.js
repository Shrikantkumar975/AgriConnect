const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    crop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Crop',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Prevent user from submitting more than one review per crop
reviewSchema.index({ crop: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (cropId) {
    const obj = await this.aggregate([
        {
            $match: { crop: cropId }
        },
        {
            $group: {
                _id: '$crop',
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 }
            }
        }
    ]);

    try {
        await this.model('Crop').findByIdAndUpdate(cropId, {
            averageRating: obj[0] ? Math.round(obj[0].averageRating * 10) / 10 : 0, // Round to 1 decimal
            totalReviews: obj[0] ? obj[0].totalReviews : 0
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.crop);
});

// Call getAverageRating before remove
reviewSchema.post('remove', function () {
    this.constructor.getAverageRating(this.crop);
});

module.exports = mongoose.model('Review', reviewSchema);
