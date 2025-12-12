import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Log environment for debugging
console.log('Environment:', process.env.NODE_ENV)
console.log('Database Host:', process.env.DB_HOST)
console.log('Database Name:', process.env.DB_NAME)
console.log('Database User:', process.env.DB_USERNAME)
console.log('Postgres User:', process.env.POSTGRES_USER)
console.log('Database Password exists:', !!process.env.DB_PASSWORD)

// 创建 Sequelize 实例
const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.POSTGRES_DB || 'dating-app',
  process.env.DB_USERNAME || process.env.POSTGRES_USER || 'love',
  process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'wkw659QxAYHl26SWQPnYcMtAFjBfIifP',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || '5432'),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    },
    // Render PostgreSQL requires SSL
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  }
)

// 测试数据库连接
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('PostgreSQL Connected successfully')
    
    // 自动同步模型到数据库
    await sequelize.sync({
      alter: true, // 开发环境下使用alter: true，生产环境下应使用migrations
      force: false // 不要使用force: true，否则会删除所有数据
    })
    console.log('Database synchronized successfully')
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error)
    process.exit(1)
  }
}

export { sequelize }
export default connectDB