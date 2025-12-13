"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserStatus = exports.getAllUsers = exports.updateUserProfile = exports.getCurrentUser = void 0;
const sequelize_1 = require("sequelize");
// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getCurrentUser = async (req, res) => {
    try {
        // 获取User模型
        const User = global.User;
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCurrentUser = getCurrentUser;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        // 获取User模型
        const User = global.User;
        const { username, email } = req.body;
        // Check if username or email is already taken by another user
        const existingUser = await User.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email }, { username }],
                id: { [sequelize_1.Op.ne]: req.user.id }
            }
        });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Update user
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({ username, email });
        await user.save();
        res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    }
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
            const messages = error.errors.map((err) => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateUserProfile = updateUserProfile;
// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        // 获取User模型
        const User = global.User;
        const users = await User.findAll();
        // 确保返回纯JavaScript对象而不是Sequelize实例
        const plainUsers = users.map((user) => user.toJSON ? user.toJSON() : user);
        // 返回明确的数据结构
        res.status(200).json({
            success: true,
            users: plainUsers,
            count: plainUsers.length
        });
    }
    catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getAllUsers = getAllUsers;
// @desc    Update user status (admin only)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
    try {
        // 获取User模型
        const User = global.User;
        const { id } = req.params;
        const { status } = req.body;
        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const user = await User.findByPk(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({ status });
        await user.save();
        res.status(200).json({
            message: 'User status updated successfully',
            user
        });
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map((err) => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        console.error('Error in updateUserStatus:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateUserStatus = updateUserStatus;
// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        // 获取User模型
        const User = global.User;
        const { id } = req.params;
        const user = await User.findByPk(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map