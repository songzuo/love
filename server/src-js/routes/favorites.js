const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/favorites
// @desc    Get user's favorite list
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // For now, return empty array as we don't have favorites table yet
    // In a real app, you would query a favorites/likes table
    res.status(200).json([]);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/favorites/:id
// @desc    Add user to favorites
// @access  Private
router.post('/:id', auth, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    
    // Check if target user exists
    const targetUser = await req.app.locals.User.findByPk(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In a real app, you would insert into favorites table
    // For now, just return success
    res.status(200).json({ 
      message: 'Added to favorites successfully',
      user: {
        id: targetUser.id,
        username: targetUser.username
      }
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/favorites/:id
// @desc    Remove user from favorites
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // In a real app, you would delete from favorites table
    res.status(200).json({ message: 'Removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
