import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB, { sequelize } from './utils/db'
import { createModels } from './models'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import adminRoutes from './routes/admin'
import messageRoutes from './routes/messages'

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Connect to database
connectDB()

// Initialize models and relationships
const { User, Message } = createModels(sequelize)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/messages', messageRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dating App API is running' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Export models for use in other files
export { User, Message }