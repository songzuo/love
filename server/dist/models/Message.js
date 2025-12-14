"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Message extends sequelize_1.Model {
}
const MessageModel = (sequelize) => {
    Message.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        senderId: {
            type: sequelize_1.DataTypes.INTEGER,
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
            type: sequelize_1.DataTypes.INTEGER,
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
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Message content is required'
                }
            }
        },
        isRead: {
            type: sequelize_1.DataTypes.BOOLEAN,
            field: 'isRead',
            defaultValue: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            field: 'createdAt'
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            field: 'updatedAt'
        }
    }, {
        sequelize,
        tableName: 'messages',
        timestamps: true,
        underscored: false, // 与User模型保持一致，不使用下划线命名策略
        createdAt: 'createdAt', // 明确指定字段名
        updatedAt: 'updatedAt' // 明确指定字段名
    });
    return Message;
};
exports.default = MessageModel;
//# sourceMappingURL=Message.js.map