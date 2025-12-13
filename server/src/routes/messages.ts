import express from 'express'
import { auth } from '../middleware/auth'
import {
  sendMessage,
  getMessages,
  getConversation,
  markAsRead,
  deleteMessage
} from '../controllers/messageController'

const router = express.Router()

// @route   POST /api/messages/send
// @desc    Send a new message
// @access  Private
router.post('/send', auth, sendMessage)

// @route   GET /api/messages
// @desc    Get all messages for current user
// @access  Private
router.get('/', auth, getMessages)

// @route   GET /api/messages/conversation/:userId
// @desc    Get conversation with a specific user
// @access  Private
router.get('/conversation/:userId', auth, getConversation)

// @route   PUT /api/messages/:messageId/read
// @desc    Mark message as read
// @access  Private
router.put('/:messageId/read', auth, markAsRead)

// @route   DELETE /api/messages/:messageId
// @desc    Delete message
// @access  Private
router.delete('/:messageId', auth, deleteMessage)

export default router