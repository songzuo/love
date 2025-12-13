import { Model, Sequelize } from 'sequelize';
import type { UserAttributes } from './User';
interface MessageAttributes {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    sender?: UserAttributes;
    recipient?: UserAttributes;
}
interface MessageCreationAttributes extends Omit<MessageAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    sender?: any;
    recipient?: any;
}
declare const MessageModel: (sequelize: Sequelize) => typeof Message;
export type { MessageAttributes, MessageCreationAttributes };
export default MessageModel;
//# sourceMappingURL=Message.d.ts.map