const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chat = require('../models/Chat');

let io;

const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*", // Allow all origins for development to avoid port mismatch issues
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = await User.findById(decoded.id);
            if (!socket.user) {
                return next(new Error('User not found'));
            }
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    const onlineUsers = new Map(); // userId -> socketId

    io.on('connection', (socket) => {
        const userId = socket.user._id.toString();
        console.log('New client connected:', socket.user.name);

        // Track online user
        onlineUsers.set(userId, socket.id);
        io.emit('user_status', { userId, status: 'online' });

        // Send existing online users to the new client
        socket.emit('online_users', Array.from(onlineUsers.keys()));

        // Join a room based on user ID for private messaging
        socket.join(userId);

        socket.on('join_chat', (chatId) => {
            socket.join(chatId);
            console.log(`User ${socket.user.name} joined chat: ${chatId}`);
        });

        socket.on('typing', ({ chatId, receiverId }) => {
            io.to(chatId).emit('typing', { chatId, userId: socket.user._id });
        });

        socket.on('stop_typing', ({ chatId, receiverId }) => {
            io.to(chatId).emit('stop_typing', { chatId, userId: socket.user._id });
        });

        socket.on('mark_read', async ({ chatId, messageIds }) => {
            try {
                // Update messages in DB
                // This is a simplification; might need a more robust query depending on message tracking
                // For now, we assume frontend sends the signal when opening a chat

                await Chat.updateOne(
                    { _id: chatId },
                    {
                        $set: { "messages.$[elem].isRead": true, "messages.$[elem].readAt": new Date() },
                        "unreadCount.farmer": 0, // Simplified logic: reset count for viewer
                        "unreadCount.buyer": 0   // In reality, should check which user is reading
                    },
                    { arrayFilters: [{ "elem.isRead": false, "elem.sender": { $ne: socket.user._id } }] }
                );

                io.to(chatId).emit('messages_read', { chatId, userId: socket.user._id });
            } catch (error) {
                console.error('Socket: Error marking read', error);
            }
        });

        socket.on('send_message', async (data) => {
            const { chatId, content, receiverId } = data;

            try {
                // Save message to database
                const chat = await Chat.findById(chatId);
                if (chat) {
                    const newMessage = {
                        sender: socket.user._id,
                        content: content,
                        timestamp: new Date(),
                        isRead: false
                    };
                    chat.messages.push(newMessage);
                    chat.lastMessage = {
                        content: content,
                        sender: socket.user._id,
                        timestamp: new Date()
                    };

                    await chat.save();

                    // Emit to everyone in the chat room
                    io.to(chatId).emit('receive_message', {
                        ...newMessage,
                        chatId
                    });

                    // Also emit to receiver's personal room for notifications if they aren't in the chat room
                    io.to(receiverId).emit('notification', {
                        type: 'new_message',
                        chatId,
                        senderName: socket.user.name,
                        content
                    });

                } else {
                    console.log('Socket: Chat not found', chatId);
                }
            } catch (error) {
                console.error('Socket: Error sending message', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.user.name);
            onlineUsers.delete(userId);
            io.emit('user_status', { userId, status: 'offline' });
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = { initSocket, getIo };
