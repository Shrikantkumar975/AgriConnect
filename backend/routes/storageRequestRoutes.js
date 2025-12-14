const express = require('express');
const router = express.Router();
const {
    createRequest,
    getMyRequests,
    getWarehouseRequests,
    updateRequestStatus
} = require('../controllers/storageRequestController');
const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, createRequest);

router.route('/my-requests')
    .get(protect, getMyRequests);

router.route('/warehouse/:warehouseId')
    .get(protect, getWarehouseRequests);

router.route('/:id/status')
    .put(protect, updateRequestStatus);

module.exports = router;
