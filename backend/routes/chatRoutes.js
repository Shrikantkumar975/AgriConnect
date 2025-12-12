const express = require('express');
const { protect } = require('../middleware/auth');
const { getChats, getChat, createChat, deleteChat } = require('../controllers/chatController');

const router = express.Router();

router.use(protect);

router.get('/', getChats);
router.get('/:id', getChat);
router.post('/', createChat);
router.delete('/:id', deleteChat);

module.exports = router;
