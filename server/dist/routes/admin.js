"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// Apply auth middleware to all admin routes
router.use(auth_1.auth, auth_1.admin);
// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', userController_1.getAllUsers);
// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private/Admin
router.put('/users/:id/status', userController_1.updateUserStatus);
// @route   PUT /api/admin/users/:id/promote
// @desc    Promote user to admin
// @access  Private/Admin
router.put('/users/:id/promote', adminController_1.promoteToAdmin);
// @route   PUT /api/admin/users/:id/demote
// @desc    Demote admin to user
// @access  Private/Admin
router.put('/users/:id/demote', adminController_1.demoteToUser);
// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', userController_1.deleteUser);
// @route   GET /api/admin/statistics
// @desc    Get basic admin statistics
// @access  Private/Admin
router.get('/statistics', adminController_1.getStatistics);
// @route   GET /api/admin/statistics/detailed
// @desc    Get detailed admin statistics
// @access  Private/Admin
router.get('/statistics/detailed', adminController_1.getDetailedStatistics);
exports.default = router;
//# sourceMappingURL=admin.js.map