const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv'); // Import dotenv
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');  // Import the Swagger configuration

dotenv.config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for session management
app.use(session({
  secret: process.env.SESSION_SECRET, // Set session secret
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport')(passport); // Pass passport as an argument

// Define routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET, // Provide a secret for session encryption
    resave: false,
    saveUninitialized: false
  }));
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
