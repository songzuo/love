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
            defaultValue: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'messages',
        timestamps: true
    });
    return Message;
};
exports.default = MessageModel;
//# sourceMappingURL=Message.js.map