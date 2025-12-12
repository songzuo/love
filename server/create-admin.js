const { sequelize } = require('./src-js/utils/db');
const { User } = require('./src-js/models');

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@example.com' }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await sequelize.close();
      return;
    }
    
    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('\n✓ Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nAdmin details:', {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdmin();
