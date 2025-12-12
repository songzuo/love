const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'dating-app',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'songzone',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false
  }
);

async function checkUsers() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    
    const [users] = await sequelize.query('SELECT id, username, email, role, status FROM users');
    console.log('\n=== Users in database ===');
    console.log(JSON.stringify(users, null, 2));
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUsers();
