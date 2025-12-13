import express from 'express'
import { auth } from '../middleware/auth'
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController'

const router = express.Router()

// @route   GET /api/favorites
// @desc    Get all favorites for current user
// @access  Private
router.get('/', auth, getFavorites)

// @route   POST /api/favorites/:userId
// @desc    Add a user to favorites
// @access  Private
router.post('/:userId', auth, addFavorite)

// @route   DELETE /api/favorites/:userId
// @desc    Remove a user from favorites
// @access  Private
router.delete('/:userId', auth, removeFavorite)

export default router