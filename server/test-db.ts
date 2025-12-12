import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'dating-app',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'songzone',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: console.log
  }
)

// Test connection
async function testConnection() {
  try {
    console.log('Attempting to connect to PostgreSQL...')
    await sequelize.authenticate()
    console.log('PostgreSQL Connected successfully')
    await sequelize.close()
    console.log('Connection closed')
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error)
  }
}

testConnection()
