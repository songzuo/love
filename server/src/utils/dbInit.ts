import bcrypt from 'bcryptjs';

const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // 获取所有需要的模型
    const User = (global as any).User;
    const Favorite = (global as any).Favorite;
    if (!User || !Favorite) {
      console.log('Required models not available yet');
      return;
    }
    
    // 确保所有表都已创建
    const sequelize = (global as any).sequelize;
    if (sequelize) {
      console.log('Syncing database models...');
      try {
        // 使用sync({ force: false })确保表存在但不会删除现有数据
        await sequelize.sync({ force: false });
        console.log('Database models synced successfully');
      } catch (syncError) {
        console.error('Error syncing database models:', syncError);
      }
    }
    
    // 检查当前表结构
    try {
      const queryInterface = (global as any).sequelize.getQueryInterface();
      const tables = await queryInterface.showAllTables();
      console.log('Existing tables:', tables);
      
      if (tables.includes('users')) {
        const tableDesc = await queryInterface.describeTable('users');
        console.log('Current users table structure:', tableDesc);
      }
      
      if (tables.includes('favorites')) {
        const tableDesc = await queryInterface.describeTable('favorites');
        console.log('Current favorites table structure:', tableDesc);
      }
    } catch (tableError) {
      console.log('Could not check table structure:', tableError);
    }
    
    // 管理员账户信息
    const adminUsers = [
      { email: 'bigasong5@gmail.com', username: 'bigasong5', password: 'admin123' },
      { email: 'bigasong4@gmail.com', username: 'bigasong4', password: 'admin123' },
      { email: 'admin@admin.com', username: 'admin', password: '123456' }
    ];
    
    // 创建或更新管理员用户
    for (const adminInfo of adminUsers) {
      try {
        console.log(`Processing admin user: ${adminInfo.email}`);
        const existingAdmin = await User.findOne({ where: { email: adminInfo.email } });
        if (!existingAdmin) {
          console.log(`Creating new admin user: ${adminInfo.email}`);
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(adminInfo.password, salt);
          
          const adminUser = await User.create({
            username: adminInfo.username,
            email: adminInfo.email,
            password: hashedPassword,
            role: 'admin',
            status: 'active'
          });
          
          console.log('Created admin user:', adminUser.email);
        } else {
          console.log('Admin user already exists:', adminInfo.email);
          // 确保现有管理员用户的角色是admin
          if (existingAdmin.role !== 'admin') {
            await existingAdmin.update({ role: 'admin' });
            console.log('Updated existing user to admin:', adminInfo.email);
          }
        }
      } catch (userError) {
        console.error(`Error creating/updating admin user ${adminInfo.email}:`, userError);
        // 继续处理其他管理员用户，不要因为一个用户的错误而停止整个过程
      }
    }
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
    // 添加更多错误信息以便调试
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
};

export default initializeDatabase;