import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB, { sequelize } from './utils/db'
import { createModels } from './models'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import adminRoutes from './routes/admin'
import messageRoutes from './routes/messages'
import publicAdminRoutes from './routes/publicAdmin'
import path from 'path'
import fs from 'fs'
import initializeDatabase from './utils/dbInit'

// Load environment variables
dotenv.config()

// Log environment info
console.log('Starting server...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Initialize express app
const app = express()

// Connect to database
console.log('Connecting to database...');
connectDB()
  .then(async () => {
    console.log('Database connected successfully');
    
    // Initialize models and relationships AFTER database connection
    const { User, Message } = createModels(sequelize) as { User: any, Message: any }
    
    // Make models globally available
    (global as any).User = User;
    (global as any).Message = Message;
    
    // Initialize database with admin users AFTER models are created
    await initializeDatabase();
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  });

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/public-admin', publicAdminRoutes) // 新增的公共管理路由

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dating App API is running' })
})

// Serve static files from client build directory
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../client/dist');
  console.log('Static files path:', staticPath);
  
  // Check if the directory exists
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
  
  // Serve index.html for all non-API routes (for SPA)
  app.get(/^\/(?!api).*$/, (req, res) => {
    const indexPath = path.join(__dirname, '../../client/dist/index.html');
    console.log('Serving index.html for route:', req.url);
    
    // Check if file exists before sending
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('Index file not found:', indexPath);
      res.status(404).json({ message: 'Frontend build not found' });
    }
  });
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Export models for use in other files
// We'll export them from the global scope since they're initialized asynchronously
export const User = () => (global as any).User;
export const Message = () => (global as any).Message;