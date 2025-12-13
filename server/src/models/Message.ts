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
        field: 'senderId',
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
        field: 'recipientId',
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
        field: 'isRead',
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createdAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updatedAt'
      }
    },
    {
      sequelize,
      tableName: 'messages',
      timestamps: true,
      underscored: false, // 与User模型保持一致，不使用下划线命名策略
      createdAt: 'createdAt', // 明确指定字段名
      updatedAt: 'updatedAt'  // 明确指定字段名
    }
  )

  return Message
}

export type { MessageAttributes, MessageCreationAttributes }
export default MessageModel