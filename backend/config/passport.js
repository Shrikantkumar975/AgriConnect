const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
    const callbackURL = process.env.NODE_ENV === 'production'
        ? 'https://agriconnect-mkkv.onrender.com/api/auth/google/callback'
        : '/api/auth/google/callback';

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL,
        passReqToCallback: true,
        proxy: true // trust the proxy
    },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                // Attempt to get role from state
                let role = 'buyer';
                if (req.query.state) {
                    try {
                        // Passport might decode state automatically or we receive it raw.
                        // Usually it's base64url encoded by the client wrapper or passed as is.
                        // We'll assume we pass a JSON string.
                        const stateObj = JSON.parse(req.query.state);
                        if (stateObj.role) role = stateObj.role;
                    } catch (e) {
                        console.log('Error parsing state:', e);
                    }
                }

                // Check if user exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check by email
                user = await User.findOne({ email: profile.emails[0].value });
                if (user) {
                    user.googleId = profile.id;
                    // Only update profile picture if it's currently the default or missing
                    if ((!user.profilePicture || user.profilePicture === 'no-photo.jpg') && profile.photos && profile.photos.length > 0) {
                        user.profilePicture = profile.photos[0].value;
                    }
                    if (!user.name) user.name = profile.displayName;

                    await user.save();
                    return done(null, user);
                }

                console.log('Google Profile:', JSON.stringify(profile, null, 2));

                // Create new
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: role,
                    profilePicture: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : 'no-photo.jpg'
                };

                user = await User.create(newUser);
                done(null, user);

            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
