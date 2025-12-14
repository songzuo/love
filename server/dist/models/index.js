"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModels = void 0;
const User_1 = __importDefault(require("./User"));
const Message_1 = __importDefault(require("./Message"));
const Favorite_1 = __importDefault(require("./Favorite"));
// Create a models object to hold all models
const createModels = (sequelize) => {
    // Initialize models
    const User = (0, User_1.default)(sequelize);
    const Message = (0, Message_1.default)(sequelize);
    const Favorite = (0, Favorite_1.default)(sequelize);
    // Define relationships
    User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
    User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' });
    Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
    Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });
    // Favorite relationships
    User.hasMany(Favorite, { as: 'favorites', foreignKey: 'userId' });
    User.hasMany(Favorite, { as: 'favoritedBy', foreignKey: 'favoritedUserId' });
    Favorite.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    Favorite.belongsTo(User, { as: 'favoritedUser', foreignKey: 'favoritedUserId' });
    return {
        User,
        Message,
        Favorite
    };
};
exports.createModels = createModels;
//# sourceMappingURL=index.js.map