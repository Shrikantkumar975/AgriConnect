const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Chat = require('./models/Chat');
const User = require('./models/User');

dotenv.config();

const listChats = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const chats = await Chat.find().populate('participants', 'name email');
        console.log(`Total chats: ${chats.length}`);
        chats.forEach(chat => {
            console.log(`Chat ID: ${chat._id}`);
            console.log(`Participants: ${chat.participants.map(p => p.email).join(', ')}`);
            console.log('---');
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listChats();
