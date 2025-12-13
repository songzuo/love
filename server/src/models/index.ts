import { Sequelize } from 'sequelize'
import UserModel from './User'
import MessageModel from './Message'
import FavoriteModel from './Favorite'

// Create a models object to hold all models
export const createModels = (sequelize: Sequelize) => {
  // Initialize models
  const User = UserModel(sequelize)
  const Message = MessageModel(sequelize)
  const Favorite = FavoriteModel(sequelize)

  // Define relationships
  User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' })
  User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' })
  Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' })
  Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' })

  // Favorite relationships
  User.hasMany(Favorite, { as: 'favorites', foreignKey: 'userId' })
  User.hasMany(Favorite, { as: 'favoritedBy', foreignKey: 'favoritedUserId' })
  Favorite.belongsTo(User, { as: 'user', foreignKey: 'userId' })
  Favorite.belongsTo(User, { as: 'favoritedUser', foreignKey: 'favoritedUserId' })

  return {
    User,
    Message,
    Favorite
  }
}

// Export types for use in other files
export type { UserAttributes, UserCreationAttributes } from './User'
export type { MessageAttributes, MessageCreationAttributes } from './Message'
export type { FavoriteAttributes, FavoriteCreationAttributes } from './Favorite'
