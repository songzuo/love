const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/matches
// @desc    Get recommended matches for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get all users except the current user
    const users = await req.app.locals.User.findAll({
      where: {
        id: { [require('sequelize').Op.ne]: req.user.id },
        status: 'active'
      },
      attributes: ['id', 'username', 'email', 'role', 'status', 'createdAt'],
      limit: 10
    });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getMatches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/matches/:id/like
// @desc    Like a user (send friend request)
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    
    // Check if target user exists
    const targetUser = await req.app.locals.User.findByPk(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Here you would typically create a "like" or "friend request" record
    // For now, we'll just return success
    res.status(200).json({ 
      message: 'Friend request sent successfully',
      targetUser: {
        id: targetUser.id,
        username: targetUser.username
      }
    });
  } catch (error) {
    console.error('Error in likeUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
