"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.auth = void 0;
const jwt_1 = require("../utils/jwt");
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = (0, jwt_1.verifyToken)(token);
        // 获取User模型
        const User = global.User;
        // Get user from database
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        // Check if user is active
        if (user.status !== 'active') {
            return res.status(403).json({ message: 'Your account has been deactivated' });
        }
        // Attach user to request
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        console.error('Error in auth middleware:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.auth = auth;
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Admin access denied' });
    }
};
exports.admin = admin;
//# sourceMappingURL=auth.js.map