// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware to authenticate user
// Middleware to authenticate user
const isAuthenticated = (req, res, next) => {
    // Get token from request headers or query parameters or cookies
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Attach the decoded token payload to the request object
        req.user = decodedToken;
        next(); // Call the next middleware
    });
};

module.exports = isAuthenticated;
