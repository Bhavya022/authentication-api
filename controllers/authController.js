// // controllers/authController.js

// // Import necessary modules
// const passport = require('../passport-config');
// const User = require('../models/user');
// //const passport = require('passport');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Controller functions for authentication
// const authController = {
//     // Register a new user
//     register: async (req, res) => {
//         try {
//             const { username, email, password } = req.body;
            
//             // Check if username or email already exists
//             const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//             if (existingUser) {
//                 return res.status(400).json({ message: 'Username or email already exists' });
//             }

//             // Create new user
//             const newUser = new User({ username, email, password });
//             await newUser.save();

//             res.status(201).json({ message: 'User registered successfully' });
//         } catch (error) {
//             console.error('Error registering user:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },

//     // Log in
//     // Log in
// // login: async (req, res) => {
// //     passport.authenticate('local', { session: false }, (err, user, info) => {
// //         if (err || !user) {
// //             return res.status(401).json({ message: info.message });
// //         }
// //         req.login(user, { session: false }, (error) => {
// //             if (error) {
// //                 return res.status(500).json({ message: 'Internal server error' });
// //             }

// //             // Generate token
// //             const token = jwt.sign({ userId: user._id },'Voosh');

// //             return res.json({ token });
// //         });
// //     })(req, res); // <- This line is important, it calls the authenticate function with req and res
// // },

// login: async (req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err || !user) {
//             return res.status(401).json({ message: info.message });
//         }
//         req.login(user, { session: false }, (error) => {
//             if (error) {
//                 return res.status(500).json({ message: 'Internal server error' });
//             }

//             // Generate token
//             const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

//             return res.json({ token });
//         });
//     })(req, res, next); // Pass next function to passport.authenticate
// },


//     // Log out
//     logout: async (req, res) => {
//         req.logout(); // This method is provided by Passport.js to clear the session data
//         res.json({ message: 'Logged out successfully' });
//     },
//     // Log in or register with third-party services
//     thirdPartyLogin: async (req, res) => {
//         // Redirect the user to the third-party authentication page
//         passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
//     },

//     // Callback route for handling authentication callback from third-party service
//     thirdPartyCallback: async (req, res) => {
//         passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
//             // Successful authentication, redirect to a success route or return JWT token
//             res.redirect('/dashboard');
//         });
//     }

// };

// module.exports = authController;

// controllers/authController.js

// Import necessary modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('../passport-config');

// Controller functions for authentication
const authController = {
    // Register a new user
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            
            // Check if username or email already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user with hashed password
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Log in
    login: async (req, res, next) => {
        passport.authenticate('local', { session: false }, async (err, user, info) => {
            try {
                if (err) { 
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
              console.log(user) 
                // If user is not found or authentication fails
                if (!user || info && info.message === 'Missing credentials') {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
    
                // Compare the provided password with the hashed password 
                console.log(req.body.password, user.password)
                // const isMatch = await bcrypt.compare(req.body.password, user.password); 
                // console.log(isMatch);
                // if (!isMatch) {
                //     return res.status(401).json({ message: 'Invalid credentials' });
                // } 
                const isValidPassword = await user.isValidPassword(req.body.password); 
                console.log(isValidPassword) 
                if (!isValidPassword) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

    
                // Generate token
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
                console.log(token);
                return res.json({ token });
            } catch (error) {
                console.error('Error during login:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        })(req, res, next); // Pass next function to passport.authenticate
    },
    
    
    // Log out
    logout: async (req, res) => {
        req.logout(); // This method is provided by Passport.js to clear the session data
        res.json({ message: 'Logged out successfully' });
    },

    // Log in or register with third-party services
    thirdPartyLogin: async (req, res) => {
        // Redirect the user to the third-party authentication page
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
    },

    // Callback route for handling authentication callback from third-party service
    thirdPartyCallback: async (req, res) => {
        passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
            // Successful authentication, redirect to a success route or return JWT token
            res.redirect('/dashboard');
        });
    }
};

module.exports = authController;
