const { sequelize } = require('./src-js/utils/db');
const { User } = require('./src-js/models');

async function testLogin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    
    const testEmail = 'bigasong@gmail.com';
    console.log('\nSearching for user with email:', testEmail);
    
    const user = await User.findOne({
      where: { email: testEmail.toLowerCase() }
    });
    
    if (user) {
      console.log('\n✓ User found!');
      console.log('User data:', {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      console.log('\n✗ User NOT found');
    }
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

testLogin();
