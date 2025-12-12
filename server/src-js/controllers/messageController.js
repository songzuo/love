const { Op } = require('sequelize');

// @desc    Send a new message
// @route   POST /api/messages/send
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user.id;

    // Check if recipient exists
    const recipient = await req.app.locals.User.findByPk(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Create new message
    const message = await req.app.locals.Message.create({
      senderId: Number(senderId),
      recipientId,
      content
    });

    // Populate sender and recipient information
    const populatedMessage = await req.app.locals.Message.findByPk(message.id, {
      include: [
        { model: req.app.locals.User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: req.app.locals.User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ]
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: populatedMessage
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Error in sendMessage:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all messages for current user
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all messages where user is sender or recipient
    const messages = await req.app.locals.Message.findAll({
      where: {
        [Op.or]: [
          { senderId: Number(userId) },
          { recipientId: Number(userId) }
        ]
      },
      include: [
        { model: req.app.locals.User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: req.app.locals.User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages
    });
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get conversation with a specific user
// @route   GET /api/messages/conversation/:userId
// @access  Private
const getConversation = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = Number(req.params.userId);

    // Check if other user exists
    const otherUser = await req.app.locals.User.findByPk(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get conversation between current user and other user
    const messages = await req.app.locals.Message.findAll({
      where: {
        [Op.or]: [
          { senderId: Number(currentUserId), recipientId: otherUserId },
          { senderId: otherUserId, recipientId: Number(currentUserId) }
        ]
      },
      include: [
        { model: req.app.locals.User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: req.app.locals.User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ],
      order: [['createdAt', 'ASC']]
    });

    // Mark all received messages as read
    await req.app.locals.Message.update(
      { isRead: true },
      {
        where: {
          senderId: otherUserId,
          recipientId: Number(currentUserId),
          isRead: false
        }
      }
    );

    res.status(200).json({
      message: 'Conversation retrieved successfully',
      data: messages
    });
  } catch (error) {
    console.error('Error in getConversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:messageId/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const messageId = Number(req.params.messageId);
    const userId = req.user.id;

    // Check if message exists and belongs to the user
    const message = await req.app.locals.Message.findOne({
      where: {
        id: messageId,
        recipientId: Number(userId)
      }
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Mark as read
    await message.update({ isRead: true });
    await message.save();

    res.status(200).json({
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    console.error('Error in markAsRead:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:messageId
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const messageId = Number(req.params.messageId);
    const userId = req.user.id;

    // Check if message exists and belongs to the user (sender or recipient)
    const message = await req.app.locals.Message.findOne({
      where: {
        id: messageId,
        [Op.or]: [
          { senderId: Number(userId) },
          { recipientId: Number(userId) }
        ]
      }
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Delete message
    await message.destroy();

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMessage:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendMessage, getMessages, getConversation, markAsRead, deleteMessage };