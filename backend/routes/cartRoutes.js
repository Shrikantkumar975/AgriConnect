const express = require('express');
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('buyer'));

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeFromCart);

module.exports = router;
