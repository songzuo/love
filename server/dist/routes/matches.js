"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const matchController_1 = require("../controllers/matchController");
const router = express_1.default.Router();
// @route   GET /api/matches
// @desc    Get recommended matches for current user
// @access  Private
router.get('/', auth_1.auth, matchController_1.getMatches);
// @route   POST /api/matches/:userId/like
// @desc    Like a user (send friend request)
// @access  Private
router.post('/:userId/like', auth_1.auth, matchController_1.likeUser);
exports.default = router;
//# sourceMappingURL=matches.js.map