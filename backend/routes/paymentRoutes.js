const express = require('express');
const router = express.Router();
const { processMockPayment } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/mock-process', protect, authorize('buyer'), processMockPayment);

module.exports = router;
