import { User } from '../index';
import bcrypt from 'bcryptjs';

const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // 设置指定用户为管理员
    const user1 = await User.findOne({ where: { email: 'bigasong5@gmail.com' } });
    if (user1) {
      await user1.update({ role: 'admin' });
      console.log('Updated bigasong5@gmail.com to admin');
    } else {
      console.log('User bigasong5@gmail.com not found');
    }
    
    // 创建新的管理员用户
    const adminEmail = 'admin@admin.com';
    const adminPassword = '123456';
    
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      const adminUser = await User.create({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active'
      });
      
      console.log('Created admin user:', adminUser.email);
    } else {
      console.log('Admin user already exists');
      // 确保现有管理员用户的角色是admin
      if (existingAdmin.role !== 'admin') {
        await existingAdmin.update({ role: 'admin' });
        console.log('Updated existing admin user role');
      }
    }
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initializeDatabase;