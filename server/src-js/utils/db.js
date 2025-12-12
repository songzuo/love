const { Sequelize } = require('sequelize');
require('dotenv').config();

// Load environment variables
require('dotenv').config();

// Debug all relevant environment variables
console.log('All env vars in JS:', {
  DB_USERNAME: process.env.DB_USERNAME,
  POSTGRES_USER: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? '***SET***' : '***NOT SET***',
  DB_NAME: process.env.DB_NAME,
  POSTGRES_DB: process.env.POSTGRES_DB,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT
});

// Ensure we're using the correct database credentials
const dbUsername = process.env.DB_USERNAME || process.env.POSTGRES_USER || 'love';
const dbPassword = process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'wkw659QxAYHl26SWQPnYcMtAFjBfIifP';
const dbName = process.env.DB_NAME || process.env.POSTGRES_DB || 'love_tmwe';
const dbHost = process.env.DB_HOST || 'dpg-d4u9oem3jp1c73dtqr9g-a';
const dbPort = parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || '5432');

console.log('Final database credentials in JS - User:', dbUsername, 'DB:', dbName, 'Host:', dbHost, 'Port:', dbPort);

const sequelize = new Sequelize(
  dbName,
  dbUsername,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false,
    // Render PostgreSQL requires SSL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // 同步模型到数据库
    await sequelize.sync({ alter: true });
    console.log('Database models synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };