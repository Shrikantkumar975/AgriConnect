const express = require('express');
const { createOrder, getMyOrders, getFarmerOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// Buyer Routes
router.post('/', authorize('buyer'), createOrder);
router.get('/myorders', authorize('buyer'), getMyOrders);

// Farmer Routes
router.get('/farmerorders', authorize('farmer'), getFarmerOrders);
router.put('/:id', authorize('farmer', 'admin'), updateOrderStatus);

module.exports = router;
