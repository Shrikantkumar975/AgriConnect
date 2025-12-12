const express = require('express');
const { getReviews, addReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getReviews)
    .post(protect, authorize('buyer'), addReview);

module.exports = router;
