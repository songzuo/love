const express = require('express');
const { auth, admin } = require('../middleware/auth');
const { getAllUsers, updateUserStatus, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(auth, admin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', getAllUsers);

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private/Admin
router.put('/users/:id/status', updateUserStatus);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', deleteUser);

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await req.app.locals.User.findByPk(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ role });
    res.status(200).json({ message: 'Role updated successfully', user });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/statistics
// @desc    Get basic statistics
// @access  Private/Admin
router.get('/statistics', async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const totalUsers = await req.app.locals.User.count();
    const activeUsers = await req.app.locals.User.count({ where: { status: 'active' } });
    const inactiveUsers = await req.app.locals.User.count({ where: { status: 'inactive' } });
    const adminUsers = await req.app.locals.User.count({ where: { role: 'admin' } });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = await req.app.locals.User.count({
      where: { createdAt: { [Op.gte]: today } }
    });
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersThisWeek = await req.app.locals.User.count({
      where: { createdAt: { [Op.gte]: weekAgo } }
    });

    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      newUsersToday,
      newUsersThisWeek
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/statistics/detailed
// @desc    Get detailed statistics
// @access  Private/Admin
router.get('/statistics/detailed', async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const totalUsers = await req.app.locals.User.count();
    const activeUsers = await req.app.locals.User.count({ where: { status: 'active' } });
    const inactiveUsers = await req.app.locals.User.count({ where: { status: 'inactive' } });
    const adminUsers = await req.app.locals.User.count({ where: { role: 'admin' } });
    const regularUsers = await req.app.locals.User.count({ where: { role: 'user' } });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = await req.app.locals.User.count({
      where: { createdAt: { [Op.gte]: today } }
    });
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersThisWeek = await req.app.locals.User.count({
      where: { createdAt: { [Op.gte]: weekAgo } }
    });
    
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const newUsersThisMonth = await req.app.locals.User.count({
      where: { createdAt: { [Op.gte]: monthAgo } }
    });

    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      regularUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth
    });
  } catch (error) {
    console.error('Error fetching detailed statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;