import { Model, DataTypes, Sequelize } from 'sequelize'
import type { UserAttributes } from './User'

interface MessageAttributes {
  id: number
  senderId: number
  recipientId: number
  content: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
  // 关联
  sender?: UserAttributes
  recipient?: UserAttributes
}

interface MessageCreationAttributes extends Omit<MessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number
  public senderId!: number
  public recipientId!: number
  public content!: string
  public isRead!: boolean
  public createdAt!: Date
  public updatedAt!: Date
  public sender?: any
  public recipient?: any
}

const MessageModel = (sequelize: Sequelize) => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'recipient_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Message content is required'
          }
        }
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        field: 'is_read',
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'messages',
      timestamps: true,
      underscored: true
    }
  )

  return Message
}

export type { MessageAttributes, MessageCreationAttributes }
export default MessageModel