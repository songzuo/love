const { Op } = require('sequelize');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getCurrentUser = async (req, res) => {
  try {
    const user = await req.app.locals.User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if username or email is already taken by another user
    const existingUser = await req.app.locals.User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
        id: { [Op.ne]: req.user.id }
      }
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Update user
    const user = await req.app.locals.User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ username, email });
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Error in updateUserProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await req.app.locals.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user status (admin only)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await req.app.locals.User.findByPk(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ status });
    await user.save();

    res.status(200).json({
      message: 'User status updated successfully',
      user
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Error in updateUserStatus:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await req.app.locals.User.findByPk(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCurrentUser, updateUserProfile, getAllUsers, updateUserStatus, deleteUser };