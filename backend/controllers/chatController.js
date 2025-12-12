const Chat = require('../models/Chat');
const User = require('../models/User');

// @desc    Get all chats for current user
// @route   GET /api/chats
// @access  Private
exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            participants: req.user.id
        })
            .populate('participants', 'name profilePicture role')
            .sort({ lastMessage: -1 });

        res.status(200).json({ success: true, data: chats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get specific chat by ID
// @route   GET /api/chats/:id
// @access  Private
exports.getChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate('participants', 'name profilePicture role')
            .populate('messages.sender', 'name');

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        // Ensure user is participant
        if (!chat.participants.some(p => p._id.toString() === req.user.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.status(200).json({ success: true, data: chat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or get existing chat with a user
// @route   POST /api/chats
// @access  Private
exports.createChat = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Check if chat already exists
        let chat = await Chat.findOne({
            participants: { $all: [req.user.id, userId] }
        });

        if (chat) {
            return res.status(200).json({ success: true, data: chat });
        }

        // Create new chat
        chat = await Chat.create({
            participants: [req.user.id, userId],
            messages: []
        });

        chat = await chat.populate('participants', 'name profilePicture role');

        res.status(201).json({ success: true, data: chat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete chat
// @route   DELETE /api/chats/:id
// @access  Private
exports.deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        // Ensure user is participant
        if (!chat.participants.some(p => p.toString() === req.user.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        await chat.deleteOne();

        res.status(200).json({ success: true, message: 'Chat deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
