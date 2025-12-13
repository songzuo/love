import express from 'express'
import { auth } from '../middleware/auth'
import { getMatches, likeUser } from '../controllers/matchController'

const router = express.Router()

// @route   GET /api/matches
// @desc    Get recommended matches for current user
// @access  Private
router.get('/', auth, getMatches)

// @route   POST /api/matches/:userId/like
// @desc    Like a user (send friend request)
// @access  Private
router.post('/:userId/like', auth, likeUser)

export default router