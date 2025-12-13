"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
// @route   POST /api/messages/send
// @desc    Send a new message
// @access  Private
router.post('/send', auth_1.auth, messageController_1.sendMessage);
// @route   GET /api/messages
// @desc    Get all messages for current user
// @access  Private
router.get('/', auth_1.auth, messageController_1.getMessages);
// @route   GET /api/messages/conversation/:userId
// @desc    Get conversation with a specific user
// @access  Private
router.get('/conversation/:userId', auth_1.auth, messageController_1.getConversation);
// @route   PUT /api/messages/:messageId/read
// @desc    Mark message as read
// @access  Private
router.put('/:messageId/read', auth_1.auth, messageController_1.markAsRead);
// @route   DELETE /api/messages/:messageId
// @desc    Delete message
// @access  Private
router.delete('/:messageId', auth_1.auth, messageController_1.deleteMessage);
exports.default = router;
//# sourceMappingURL=messages.js.map