"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModels = void 0;
const User_1 = __importDefault(require("./User"));
const Message_1 = __importDefault(require("./Message"));
// Create a models object to hold all models
const createModels = (sequelize) => {
    // Initialize models
    const User = (0, User_1.default)(sequelize);
    const Message = (0, Message_1.default)(sequelize);
    // Define relationships
    User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
    User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' });
    Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
    Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });
    return {
        User,
        Message
    };
};
exports.createModels = createModels;
//# sourceMappingURL=index.js.map