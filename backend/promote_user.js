const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const promoteUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const email = process.argv[2];
        if (!email) {
            console.log('Please provide an email address.');
            process.exit(1);
        }

        const user = await User.findOneAndUpdate(
            { email },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            console.log(`User with email ${email} not found!`);
        } else {
            console.log(`User ${user.name} (${email}) promoted to admin.`);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

promoteUser();
