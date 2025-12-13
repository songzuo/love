"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const initializeDatabase = async () => {
    try {
        console.log('Initializing database...');
        // 获取User模型
        const User = global.User;
        if (!User) {
            console.log('User model not available yet');
            return;
        }
        // 管理员账户信息
        const adminUsers = [
            { email: 'bigasong5@gmail.com', username: 'bigasong5', password: 'admin123' },
            { email: 'bigasong4@gmail.com', username: 'bigasong4', password: 'admin123' },
            { email: 'admin@admin.com', username: 'admin', password: '123456' }
        ];
        // 创建或更新管理员用户
        for (const adminInfo of adminUsers) {
            const existingAdmin = await User.findOne({ where: { email: adminInfo.email } });
            if (!existingAdmin) {
                const salt = await bcryptjs_1.default.genSalt(10);
                const hashedPassword = await bcryptjs_1.default.hash(adminInfo.password, salt);
                const adminUser = await User.create({
                    username: adminInfo.username,
                    email: adminInfo.email,
                    password: hashedPassword,
                    role: 'admin',
                    status: 'active'
                });
                console.log('Created admin user:', adminUser.email);
            }
            else {
                console.log('Admin user already exists:', adminInfo.email);
                // 确保现有管理员用户的角色是admin
                if (existingAdmin.role !== 'admin') {
                    await existingAdmin.update({ role: 'admin' });
                    console.log('Updated existing user to admin:', adminInfo.email);
                }
            }
        }
        console.log('Database initialization completed');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
};
exports.default = initializeDatabase;
//# sourceMappingURL=dbInit.js.map