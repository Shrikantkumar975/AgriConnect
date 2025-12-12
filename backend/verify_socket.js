const io = require('socket.io-client');
const axios = require('axios');

const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8').trim();
if (!token) {
    console.error('Token not found in token.txt');
    process.exit(1);
}

const socket = io('http://localhost:5000', {
    auth: { token }
});

socket.on('connect', async () => {
    console.log('Connected to socket server');

    // 1. Get a chat ID (create if not exists)
    try {
        const farmerRes = await axios.get('http://localhost:5000/api/auth/me', { // Hack to find a user, but let's just use a known ID or create chat
            headers: { Authorization: `Bearer ${token}` }
        });
        // We need a receiver ID. Let's assume we chat with Farmer Bob.
        // For simplicity, let's just use the API to get existing chats and pick one.
        const chatsRes = await axios.get('http://localhost:5000/api/chats', {
            headers: { Authorization: `Bearer ${token}` }
        });

        let chatId;
        if (chatsRes.data.data.length > 0) {
            chatId = chatsRes.data.data[0]._id;
            console.log('Using existing chat:', chatId);
        } else {
            console.error('No chats found. Please create one via UI first (or script).');
            process.exit(1);
        }

        // 2. Join Chat
        socket.emit('join_chat', chatId);
        console.log('Joined chat room');

        // 3. Send Message
        const content = `Test message from script ${Date.now()}`;
        socket.emit('send_message', {
            chatId,
            content,
            receiverId: 'dummy' // Not strictly needed for save
        });
        console.log('Sent message:', content);

        // 4. Listen for receipt
        socket.on('receive_message', (msg) => {
            console.log('Received message back:', msg);
            if (msg.content === content) {
                console.log('SUCCESS: Message persistence verified via Socket!');
                process.exit(0);
            }
        });

        // Timeout
        setTimeout(() => {
            console.error('TIMEOUT: Did not receive message back.');
            process.exit(1);
        }, 5000);

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
});

socket.on('connect_error', (err) => {
    console.error('Connection Error:', err.message);
    process.exit(1);
});
