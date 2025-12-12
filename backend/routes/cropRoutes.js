const express = require('express');
const {
    createCrop,
    getCrops,
    getCrop,
    updateCrop,
    deleteCrop
} = require('../controllers/cropController');

const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Re-route into other resource routers
router.use('/:cropId/reviews', reviewRouter);

router
    .route('/')
    .get(getCrops)
    .post(protect, authorize('farmer', 'admin'), upload.array('images', 5), createCrop);

router
    .route('/:id')
    .get(getCrop)
    .put(protect, authorize('farmer', 'admin'), upload.array('images', 5), updateCrop)
    .delete(protect, authorize('farmer', 'admin'), deleteCrop);

module.exports = router;
