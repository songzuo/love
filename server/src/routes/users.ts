import express from 'express'
import { auth } from '../middleware/auth'
import { getCurrentUser, updateUserProfile } from '../controllers/userController'

const router = express.Router()

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, getCurrentUser)

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateUserProfile)

export default router