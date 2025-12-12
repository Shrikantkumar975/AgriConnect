const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdminWithUsername = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const username = 'admin_master';
        const password = 'securepassword';

        // Check if exists
        let user = await User.findOne({ username });
        if (user) {
            console.log('User already exists');
            process.exit();
        }

        user = await User.create({
            name: 'Master Admin',
            username: username,
            password: password,
            role: 'admin',
            phone: '0000000000'
            // No email provided
        });

        console.log(`Admin created: ${user.username}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdminWithUsername();
