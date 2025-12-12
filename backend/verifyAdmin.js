const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const verifyAndPromote = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const email = 'testadmin@example.com';
        let user = await User.findOne({ email });

        if (!user) {
            console.log('User not found!');
        } else {
            console.log(`Current role: ${user.role}`);
            if (user.role !== 'admin') {
                user.role = 'admin';
                await user.save();
                console.log('User promoted to admin.');
            } else {
                console.log('User is already admin.');
            }
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyAndPromote();
