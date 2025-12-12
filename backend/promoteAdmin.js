const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const promoteToAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const email = 'testadmin@example.com';
        const user = await User.findOneAndUpdate(
            { email },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`User ${user.name} promoted to admin.`);
        } else {
            console.log('User not found.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

promoteToAdmin();
