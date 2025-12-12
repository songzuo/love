import { Sequelize } from 'sequelize'
import UserModel from './User'
import MessageModel from './Message'

// Create a models object to hold all models
export const createModels = (sequelize: Sequelize) => {
  // Initialize models
  const User = UserModel(sequelize)
  const Message = MessageModel(sequelize)

  // Define relationships
  User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' })
  User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' })
  Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' })
  Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' })

  return {
    User,
    Message
  }
}

// Export types for use in other files
export type { UserAttributes, UserCreationAttributes } from './User'
export type { MessageAttributes, MessageCreationAttributes } from './Message'
