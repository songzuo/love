import express from 'express'
import { getAllUsers, promoteToAdmin, demoteToUser } from '../controllers/publicAdminController'

const router = express.Router()

// @route   GET /api/public-admin/users
// @desc    Get all users
// @access  Public (for testing purposes only)
router.get('/users', getAllUsers)

// @route   PUT /api/public-admin/users/:id/promote
// @desc    Promote user to admin
// @access  Public (for testing purposes only)
router.put('/users/:id/promote', promoteToAdmin)

// @route   PUT /api/public-admin/users/:id/demote
// @desc    Demote admin to user
// @access  Public (for testing purposes only)
router.put('/users/:id/demote', demoteToUser)

export default router