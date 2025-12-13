import { Request, Response } from 'express'
import Message from '../models/Message'
import User from '../models/User'

interface SendMessageRequest {
  recipientId: string
  content: string
}

// @desc    Send a new message
// @route   POST /api/messages/send
// @access  Private
export const sendMessage = async (req: any, res: Response) => {
  try {
    const { recipientId, content }: SendMessageRequest = req.body
    const senderId = req.user._id

    // Check if recipient exists
    const recipient = await User.findById(recipientId)
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' })
    }

    // Create new message
    const message = await Message.create({
      sender: senderId,
      recipient: recipientId,
      content
    })

    // Populate sender and recipient information
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'username email')
      .populate('recipient', 'username email')

    res.status(201).json({
      message: 'Message sent successfully',
      data: populatedMessage
    })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get all messages for current user
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req: any, res: Response) => {
  try {
    const userId = req.user._id

    // Get all messages where user is sender or recipient
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
      .populate('sender', 'username email')
      .populate('recipient', 'username email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get conversation with a specific user
// @route   GET /api/messages/conversation/:userId
// @access  Private
export const getConversation = async (req: any, res: Response) => {
  try {
    const currentUserId = req.user._id
    const otherUserId = req.params.userId

    // Check if other user exists
    const otherUser = await User.findById(otherUserId)
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Get conversation between current user and other user
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: otherUserId },
        { sender: otherUserId, recipient: currentUserId }
      ]
    })
      .populate('sender', 'username email')
      .populate('recipient', 'username email')
      .sort({ createdAt: 1 })

    // Mark all received messages as read
    await Message.updateMany(
      { sender: otherUserId, recipient: currentUserId, isRead: false },
      { isRead: true }
    )

    res.status(200).json({
      message: 'Conversation retrieved successfully',
      data: messages
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Mark message as read
// @route   PUT /api/messages/:messageId/read
// @access  Private
export const markAsRead = async (req: any, res: Response) => {
  try {
    const messageId = req.params.messageId
    const userId = req.user._id

    // Check if message exists and belongs to the user
    const message = await Message.findOne({
      _id: messageId,
      recipient: userId
    })

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    // Mark as read
    message.isRead = true
    await message.save()

    res.status(200).json({
      message: 'Message marked as read',
      data: message
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete message
// @route   DELETE /api/messages/:messageId
// @access  Private
export const deleteMessage = async (req: any, res: Response) => {
  try {
    const messageId = req.params.messageId
    const userId = req.user._id

    // Check if message exists and belongs to the user (sender or recipient)
    const message = await Message.findOne({
      _id: messageId,
      $or: [{ sender: userId }, { recipient: userId }]
    })

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    // Delete message
    await message.deleteOne()

    res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}