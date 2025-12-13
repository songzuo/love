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
import matchesRoutes from './routes/matches'
import favoritesRoutes from './routes/favorites'
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

// Connect to database and initialize models
console.log('Connecting to database...');
connectDB()
  .then(async () => {
    console.log('Database connected successfully');
    
    // Initialize models and relationships AFTER database connection
    const { User, Message, Favorite } = createModels(sequelize) as { User: any, Message: any, Favorite: any }
    
    // Make models globally available
    (global as any).User = User;
    (global as any).Message = Message;
    (global as any).Favorite = Favorite;
    
    // Initialize database with admin users AFTER models are created
    await initializeDatabase();
    
    // Now that database is ready, set up the rest of the app
    setupApp();
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

const setupApp = () => {
  // Middleware
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // API Routes - Always place API routes before static file serving
  app.use('/api/auth', authRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/admin', adminRoutes)
  app.use('/api/messages', messageRoutes)
  app.use('/api/public-admin', publicAdminRoutes)
  app.use('/api/matches', matchesRoutes)
  app.use('/api/favorites', favoritesRoutes)

  // Health check route
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Dating App API is running' })
  })

  // Serve static files and handle SPA routing
    // Always serve static files regardless of NODE_ENV for testing
    // In production, this will serve the built client
    // In development, this will serve the client build if it exists
    
    // Log current working directory and __dirname for debugging
    console.log('Current working directory:', process.cwd());
    console.log('__dirname:', __dirname);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Try multiple possible static paths
    const possibleStaticPaths = [
        // Default path based on __dirname
        path.join(__dirname, process.env.NODE_ENV === 'production' ? '../../../client/dist' : '../../client/dist'),
        // Alternative path based on cwd
        path.join(process.cwd(), 'client/dist'),
        // Render specific path
        path.join(process.cwd(), '../../client/dist'),
        // Another Render specific path (assuming src directory structure)
        path.join(process.cwd(), '../client/dist'),
        // Absolute path for Render
        '/opt/render/project/src/client/dist'
    ];
    
    let staticPath = '';
    let foundStaticPath = false;
    
    for (const possiblePath of possibleStaticPaths) {
        console.log('Checking static path:', possiblePath);
        if (fs.existsSync(possiblePath)) {
            console.log('✓ Found static directory:', possiblePath);
            try {
                const files = fs.readdirSync(possiblePath);
                console.log('Files in static directory:', files);
                staticPath = possiblePath;
                foundStaticPath = true;
                break;
            } catch (readError) {
                console.error('Error reading directory:', readError);
            }
        } else {
            console.log('✗ Static directory does not exist:', possiblePath);
        }
    }
    
    // If no static path found, log more debug info
    if (!foundStaticPath) {
        console.error('❌ No static directory found in any of the possible paths');
        // Log directory structure for debugging
        try {
            console.log('Directory structure from cwd:', fs.readdirSync(process.cwd()));
            if (fs.existsSync(path.join(process.cwd(), '..'))) {
                console.log('Directory structure from parent:', fs.readdirSync(path.join(process.cwd(), '..')));
            }
        } catch (dirError) {
            console.error('Error reading directory structure:', dirError);
        }
    }
    
    // Only serve static files if we found a valid static path
    if (foundStaticPath && staticPath) {
        // Serve static files with proper MIME types
        app.use(express.static(staticPath, {
            setHeaders: (res, filePath) => {
                // Set correct MIME types for JavaScript and WASM files
                if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
                    res.setHeader('Content-Type', 'application/javascript');
                } else if (filePath.endsWith('.wasm')) {
                    res.setHeader('Content-Type', 'application/wasm');
                }
            }
        }));
        
        // Serve index.html for all non-API routes (for SPA)
        // 注意：这个路由必须放在所有API路由之后
        app.get(/^\/(?!api\/).*/, (req, res) => {
            const indexPath = path.join(staticPath, 'index.html');
            console.log('Serving index.html for route:', req.url);
            console.log('Index file path:', indexPath);
            
            // Check if file exists before sending
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            } else {
                console.error('Index file not found:', indexPath);
                res.status(404).json({ message: 'Frontend build not found' });
            }
        });
    } else {
        console.warn('⚠️  No valid static path found. Static file serving disabled.');
        // Still provide a fallback for non-API routes
        app.get(/^\/(?!api\/).*/, (req, res) => {
            res.status(404).json({ message: 'Frontend build not found. Server running in API-only mode.' });
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
}

// Export models for use in other files
// We'll export them from the global scope since they're initialized asynchronously
export const User = () => (global as any).User;
export const Message = () => (global as any).Message;