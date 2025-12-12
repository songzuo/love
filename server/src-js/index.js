const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB, sequelize } = require('./utils/db');
const { User, Message } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const messageRoutes = require('./routes/messages');
const matchesRoutes = require('./routes/matches');
const usersPublicRoutes = require('./routes/usersPublic');
const favoritesRoutes = require('./routes/favorites');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Make models available to controllers
app.locals.User = User;
app.locals.Message = Message;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/favorites', favoritesRoutes);
// Note: userRoutes must come before usersPublicRoutes to match /profile first
app.use('/api/users', userRoutes);
app.use('/api/users', usersPublicRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dating App API is running' });
});

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export models for use in other files
module.exports = { User, Message };