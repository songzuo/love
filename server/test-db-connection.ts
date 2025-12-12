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
    logging: true
  }
)

// 测试数据库连接
async function testDBConnection() {
  try {
    await sequelize.authenticate()
    console.log('PostgreSQL Connected successfully')
    await sequelize.close()
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error)
  }
}

testDBConnection()