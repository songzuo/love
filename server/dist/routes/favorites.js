"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const favoriteController_1 = require("../controllers/favoriteController");
const router = express_1.default.Router();
// @route   GET /api/favorites
// @desc    Get all favorites for current user
// @access  Private
router.get('/', auth_1.auth, favoriteController_1.getFavorites);
// @route   POST /api/favorites/:userId
// @desc    Add a user to favorites
// @access  Private
router.post('/:userId', auth_1.auth, favoriteController_1.addFavorite);
// @route   DELETE /api/favorites/:userId
// @desc    Remove a user from favorites
// @access  Private
router.delete('/:userId', auth_1.auth, favoriteController_1.removeFavorite);
exports.default = router;
//# sourceMappingURL=favorites.js.map