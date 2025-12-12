const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, username, password, role, phone, farmDetails } = req.body;

        // Create user
        const user = await User.create({
            name,
            email,
            username,
            password,
            role,
            phone,
            farmDetails: role === 'farmer' ? farmDetails : undefined
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        // Validate email/username & password
        if ((!email && !username) || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email/username and password' });
        }

        // Check for user
        let user;
        if (email) {
            user = await User.findOne({ email }).select('+password');
        } else {
            user = await User.findOne({ username }).select('+password');
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
    try {
        console.log('Update Details Request Content-Type:', req.headers['content-type']);
        console.log('Update Details Request Body:', req.body);
        console.log('Update Details Request File:', req.file);

        const fieldsToUpdate = {};
        if (req.body.name) fieldsToUpdate.name = req.body.name;
        if (req.body.email) fieldsToUpdate.email = req.body.email;
        if (req.body.phone) fieldsToUpdate.phone = req.body.phone;

        // Handle farm details update
        if (req.body.farmDetails) {
            // If it's coming as a JSON object (which it should be for the text-only edit form)
            fieldsToUpdate.farmDetails = {
                ...req.user.farmDetails, // Keep existing details if not overwritten
                ...req.body.farmDetails
            };
        }

        // Handle profile picture upload
        if (req.file) {
            fieldsToUpdate.profilePicture = req.file.path;
        } else if (req.body.removeProfilePicture === 'true' || req.body.removeProfilePicture === true) {
            fieldsToUpdate.profilePicture = 'no-photo.jpg';
        }

        console.log('Fields to update:', fieldsToUpdate);

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(200).json({ success: true, message: 'No changes provided' });
        }

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error('Update Details Error:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                googleId: user.googleId
            }
        });
};
