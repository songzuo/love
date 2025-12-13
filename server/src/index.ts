import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB, { sequelize } from './utils/db'
import { createModels } from './models'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import adminRoutes from './routes/admin'
import messageRoutes from './routes/messages'
import path from 'path'

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
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  });

// Initialize models and relationships
const { User, Message } = createModels(sequelize) as { User: any, Message: any }

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from client build directory
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../client/dist');
  console.log('Static files path:', staticPath);
  app.use(express.static(staticPath));
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/messages', messageRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dating App API is running' })
})

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../../client/dist/index.html');
    console.log('Index file path:', indexPath);
    res.sendFile(indexPath);
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
export { User, Message }