"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publicAdminController_1 = require("../controllers/publicAdminController");
const router = express_1.default.Router();
// @route   GET /api/public-admin/users
// @desc    Get all users
// @access  Public (for testing purposes only)
router.get('/users', publicAdminController_1.getAllUsers);
// @route   PUT /api/public-admin/users/:id/promote
// @desc    Promote user to admin
// @access  Public (for testing purposes only)
router.put('/users/:id/promote', publicAdminController_1.promoteToAdmin);
// @route   PUT /api/public-admin/users/:id/demote
// @desc    Demote admin to user
// @access  Public (for testing purposes only)
router.put('/users/:id/demote', publicAdminController_1.demoteToUser);
exports.default = router;
//# sourceMappingURL=publicAdmin.js.map