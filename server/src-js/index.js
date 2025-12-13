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

// Log environment info
console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Initialize express app
const app = express();

// Make models available to controllers
app.locals.User = User;
app.locals.Message = Message;

// Connect to database
console.log('Connecting to database...');
connectDB()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build directory
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../client/dist');
  console.log('Static files path:', staticPath);
  
  // Check if the directory exists
  const fs = require('fs');
  if (fs.existsSync(staticPath)) {
    console.log('Static directory exists');
    // List files in the directory for debugging
    try {
      const files = fs.readdirSync(staticPath);
      console.log('Files in static directory:', files);
    } catch (err) {
      console.error('Error reading static directory:', err);
    }
  } else {
    console.error('Static directory does not exist:', staticPath);
    // Try to show the parent directory structure
    const parentDir = path.join(__dirname, '../../client');
    if (fs.existsSync(parentDir)) {
      try {
        const files = fs.readdirSync(parentDir);
        console.log('Files in client directory:', files);
      } catch (err) {
        console.error('Error reading client directory:', err);
      }
    } else {
      console.error('Client directory does not exist:', parentDir);
      // Show root structure
      const rootDir = path.join(__dirname, '../../');
      try {
        const files = fs.readdirSync(rootDir);
        console.log('Files in root directory:', files);
      } catch (err) {
        console.error('Error reading root directory:', err);
      }
    }
  }
  
  // Serve static files with proper MIME types
  app.use(express.static(staticPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
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
    const indexPath = path.join(__dirname, '../../client/dist/index.html');
    console.log('Index file path:', indexPath);
    
    // Check if file exists before sending
    const fs = require('fs');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('Index file not found:', indexPath);
      res.status(404).json({ message: 'Frontend build not found' });
    }
  });
}

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  console.error('Error stack:', err.stack);
  
  // In development, provide more detailed error information
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ 
      message: 'Something went wrong!',
      error: err.message,
      stack: err.stack
    });
  } else {
    // In production, provide generic error message
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export models for use in other files
module.exports = { User, Message };