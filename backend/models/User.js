const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: function () { return !this.googleId; },
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['farmer', 'buyer', 'admin'],
        default: 'buyer'
    },
    phone: {
        type: String,
        required: function () { return !this.googleId; }
    },
    profilePicture: {
        type: String,
        default: 'no-photo.jpg'
    },
    // Farmer specific details
    farmDetails: {
        farmName: String,
        farmSize: Number,
        location: {
            address: String,
            district: String,
            state: String,
            pincode: String,
            coordinates: [Number] // [longitude, latitude]
        }
    },
    // Buyer specific details
    shippingAddresses: [{
        address: String,
        city: String,
        state: String,
        pincode: String,
        phone: String,
        isDefault: { type: Boolean, default: false }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

module.exports = mongoose.model('User', userSchema);
