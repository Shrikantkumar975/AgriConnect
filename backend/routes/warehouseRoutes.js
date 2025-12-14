const express = require('express');
const router = express.Router();
const {
    createWarehouse,
    getWarehouses,
    getWarehouseById,
    getMyWarehouses
} = require('../controllers/warehouseController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getWarehouses)
    .post(protect, createWarehouse);

router.route('/my/warehouses')
    .get(protect, getMyWarehouses);

router.route('/:id')
    .get(getWarehouseById);

module.exports = router;
