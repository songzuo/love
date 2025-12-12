const { sequelize } = require('../utils/db');
const UserModel = require('./User');
const MessageModel = require('./Message');

// Initialize models
const User = UserModel(sequelize);
const Message = MessageModel(sequelize);

// Define relationships
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' });
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

module.exports = {
  User,
  Message
};