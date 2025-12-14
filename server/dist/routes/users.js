"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// @route   GET /api/users
// @desc    Get all users for browsing
// @access  Private
router.get('/', auth_1.auth, userController_1.getUsers);
// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth_1.auth, userController_1.getCurrentUser);
// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth_1.auth, userController_1.updateUserProfile);
exports.default = router;
//# sourceMappingURL=users.js.map