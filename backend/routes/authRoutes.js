const express = require('express');
const { register, login, getMe, updateDetails } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

const passport = require('passport');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, upload.single('profilePicture'), updateDetails);

// Google Auth
router.get('/google', (req, res, next) => {
    const role = req.query.role || 'buyer';
    const state = JSON.stringify({ role });
    passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next);
});

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        const token = req.user.getSignedJwtToken();
        // Redirect to frontend
        let clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        if (!clientUrl.startsWith('http')) {
            clientUrl = `https://${clientUrl}`;
        }
        res.redirect(`${clientUrl}/auth/success?token=${token}`);
    }
);

module.exports = router;
