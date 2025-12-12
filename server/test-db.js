const { Sequelize } = require('sequelize');

// Create Sequelize instance connected to default postgres database
const sequelize = new Sequelize(
  'postgres',
  'postgres',
  'songzone',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: console.log
  }
);

// Test connection and create database if it doesn't exist
async function testConnection() {
  try {
    console.log('Attempting to connect to PostgreSQL...');
    await sequelize.authenticate();
    console.log('PostgreSQL Connected successfully');
    
    // Create database if it doesn't exist
    const dbName = 'dating-app';
    
    // Check if database exists
    const [databases] = await sequelize.query(`SELECT datname FROM pg_database WHERE datistemplate = false`);
    const dbExists = databases.some(db => db.datname === dbName);
    
    if (!dbExists) {
      // Create database
      await sequelize.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created`);
    } else {
      console.log(`Database "${dbName}" already exists`);
    }
    
    // Close connection to default database
    await sequelize.close();
    
    // Now connect to the dating-app database
    const sequelizeApp = new Sequelize(
      dbName,
      'postgres',
      'songzone',
      {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: console.log
      }
    );
    
    await sequelizeApp.authenticate();
    console.log(`Connected to "${dbName}" database successfully`);
    await sequelizeApp.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

testConnection();
