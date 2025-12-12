import { Sequelize } from 'sequelize'

// 创建 Sequelize 实例
const sequelize = new Sequelize(
  process.env.DB_NAME || 'dating-app',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'songzone',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
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