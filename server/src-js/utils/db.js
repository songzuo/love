"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Debug all relevant environment variables
console.log('All env vars:', {
    DB_USERNAME: process.env.DB_USERNAME,
    POSTGRES_USER: process.env.POSTGRES_USER,
    DB_PASSWORD: process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? '***SET***' : '***NOT SET***',
    DB_NAME: process.env.DB_NAME,
    POSTGRES_DB: process.env.POSTGRES_DB,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT
});
// Log environment for debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('Database Host:', process.env.DB_HOST);
console.log('Database Name:', process.env.DB_NAME);
console.log('Database User:', process.env.DB_USERNAME);
console.log('Postgres User:', process.env.POSTGRES_USER);
console.log('Database Password exists:', !!process.env.DB_PASSWORD);
// Ensure we're using the correct database credentials
const dbUsername = process.env.DB_USERNAME || process.env.POSTGRES_USER || 'love';
const dbPassword = process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'wkw659QxAYHl26SWQPnYcMtAFjBfIifP';
const dbName = process.env.DB_NAME || process.env.POSTGRES_DB || 'love_tmwe';
const dbHost = process.env.DB_HOST || 'dpg-d4u9oem3jp1c73dtqr9g-a';
const dbPort = parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || '5432');
console.log('Final database credentials - User:', dbUsername, 'DB:', dbName, 'Host:', dbHost, 'Port:', dbPort);
console.log('Password length:', dbPassword.length);
// 创建 Sequelize 实例
const sequelize = new sequelize_1.Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    port: dbPort,
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
});
exports.sequelize = sequelize;
// 测试数据库连接
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected successfully');
        // 自动同步模型到数据库
        // 在生产环境中使用alter: true来更新表结构而不丢失数据
        // 在开发环境中也可以使用alter: true
        // 如果表结构不正确，我们可以临时使用force: true来重新创建表（会丢失数据）
        await sequelize.sync({
            alter: true, // 自动更新表结构以匹配模型定义
            force: false // 不要使用force: true，否则会删除所有数据
        });
        console.log('Database synchronized successfully');
        // 检查表结构是否正确
        const queryInterface = sequelize.getQueryInterface();
        const tables = await queryInterface.showAllTables();
        console.log('Existing tables:', tables);
        // 如果users表存在，检查其列
        if (tables.includes('users')) {
            const tableDesc = await queryInterface.describeTable('users');
            console.log('Users table structure:', tableDesc);
        }
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        // 添加更多错误信息以便调试
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map