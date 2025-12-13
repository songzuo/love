import express from 'express'
import { auth, admin } from '../middleware/auth'
import { getAllUsers, updateUserStatus, deleteUser } from '../controllers/userController'

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

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', deleteUser)

export default router