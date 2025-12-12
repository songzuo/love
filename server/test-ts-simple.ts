console.log('Testing simple TypeScript file')
console.log('Node.js version:', process.version)

// 尝试加载dotenv
import dotenv from 'dotenv'
dotenv.config()
console.log('Environment variables loaded:', !!process.env.DB_NAME)
console.log('DB_NAME:', process.env.DB_NAME)
console.log('DB_USERNAME:', process.env.DB_USERNAME)