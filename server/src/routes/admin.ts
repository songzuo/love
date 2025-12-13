import express from 'express'
import { auth, admin } from '../middleware/auth'
import { getAllUsers, updateUserStatus, deleteUser } from '../controllers/userController'
import { promoteToAdmin, demoteToUser, getStatistics, getDetailedStatistics } from '../controllers/adminController'

const router = express.Router()

// Apply auth middleware to all admin routes
router.use(auth, admin)

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', getAllUsers)

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private/Admin
router.put('/users/:id/status', updateUserStatus)

// @route   PUT /api/admin/users/:id/promote
// @desc    Promote user to admin
// @access  Private/Admin
router.put('/users/:id/promote', promoteToAdmin)

// @route   PUT /api/admin/users/:id/demote
// @desc    Demote admin to user
// @access  Private/Admin
router.put('/users/:id/demote', demoteToUser)

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', deleteUser)

// @route   GET /api/admin/statistics
// @desc    Get basic admin statistics
// @access  Private/Admin
router.get('/statistics', getStatistics)

// @route   GET /api/admin/statistics/detailed
// @desc    Get detailed admin statistics
// @access  Private/Admin
router.get('/statistics/detailed', getDetailedStatistics)

export default router