const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agriconnect');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const createTestUser = async () => {
    await connectDB();

    const testUser = {
        name: 'Test Farmer',
        email: 'testfarmer@example.com',
        password: 'password123',
        role: 'farmer',
        username: 'testfarmer',
        phone: '1234567890',
        profilePicture: 'uploads/fake_image.jpg', // Simulate custom image
        farmDetails: {
            farmName: 'Test Farm',
            farmSize: 10,
            location: {
                address: '123 Test St',
                district: 'Test District',
                state: 'Test State',
                pincode: '123456'
            }
        }
    };

    try {
        // Check if user exists
        let user = await User.findOne({ email: testUser.email });
        if (user) {
            console.log('User already exists, updating...');
            user.profilePicture = testUser.profilePicture;
            await user.save();
        } else {
            console.log('Creating new user...');
            user = await User.create(testUser);
        }
        console.log('Test user ready:', user.email);
        process.exit(0);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    }
};

createTestUser();
