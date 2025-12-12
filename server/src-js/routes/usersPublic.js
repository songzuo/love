const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all active users (for browsing)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get all active users except the current user
    const users = await req.app.locals.User.findAll({
      where: {
        id: { [require('sequelize').Op.ne]: req.user.id },
        status: 'active'
      },
      attributes: ['id', 'username', 'email', 'role', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
