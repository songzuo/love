import express from 'express'
import { getAllUsers, promoteToAdmin, demoteToUser } from '../controllers/publicAdminController'
import { auth, admin } from '../middleware/auth'

const router = express.Router()

// @route   GET /api/public-admin/users
// @desc    Get all users
// @access  Private - Admin only
router.get('/users', auth, admin, getAllUsers)

// @route   PUT /api/public-admin/users/:id/promote
// @desc    Promote user to admin
// @access  Private - Admin only
router.put('/users/:id/promote', auth, admin, promoteToAdmin)

// @route   PUT /api/public-admin/users/:id/demote
// @desc    Demote admin to user
// @access  Private - Admin only
router.put('/users/:id/demote', auth, admin, demoteToUser)

export default router