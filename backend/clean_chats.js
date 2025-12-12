const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Chat = require('./models/Chat');

dotenv.config();

const cleanChats = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const chats = await Chat.find();
        console.log(`Total chats before cleanup: ${chats.length}`);

        // Group by participants
        const uniquePairs = new Set();
        const toDelete = [];

        for (const chat of chats) {
            const participants = chat.participants.map(p => p.toString()).sort().join('-');
            if (uniquePairs.has(participants)) {
                toDelete.push(chat._id);
            } else {
                uniquePairs.add(participants);
            }
        }

        if (toDelete.length > 0) {
            await Chat.deleteMany({ _id: { $in: toDelete } });
            console.log(`Deleted ${toDelete.length} duplicate chats.`);
        } else {
            console.log('No duplicate chats found.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

cleanChats();
