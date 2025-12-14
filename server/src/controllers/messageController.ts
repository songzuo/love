import { Request, Response } from 'express'
import { Op } from 'sequelize'

interface SendMessageRequest {
  recipientId: number
  content: string
}

// @desc    Send a new message
// @route   POST /api/messages/send
// @access  Private
export const sendMessage = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    const Message = (global as any).Message;
    
    const { recipientId, content }: SendMessageRequest = req.body
    const senderId = req.user.id

    // Check if recipient exists
    const recipient = await User.findByPk(recipientId)
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' })
    }

    // Create new message
    const message = await Message.create({
      senderId: Number(senderId),
      recipientId,
      content,
      isRead: false
    })

    // Populate sender and recipient information
    const populatedMessage = await Message.findByPk(message.id, {
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ]
    })

    res.status(201).json({
      message: 'Message sent successfully',
      data: populatedMessage
    })
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    console.error('Error in sendMessage:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get all messages for current user
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req: any, res: Response) => {
  try {
    console.log('getMessages called with user:', req.user?.id);
    // 获取模型
    const User = (global as any).User;
    const Message = (global as any).Message;
    
    if (!User || !Message) {
      console.error('Models not found:', { User: !!User, Message: !!Message });
      return res.status(500).json({ 
        success: false, 
        message: '获取消息失败',
        error: 'Models not initialized'
      });
    }
    
    const userId = req.user.id
    console.log('Fetching messages for user:', userId);

    // Get all messages where user is sender or recipient
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: Number(userId) },
          { recipientId: Number(userId) }
        ]
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    })

    console.log('Messages found:', messages.length);
    // 确保返回纯JavaScript对象
    const plainMessages = messages.map((message: any) => message.toJSON ? message.toJSON() : message);

    // 直接返回数组给前端
    res.status(200).json(plainMessages);
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ 
      success: false,
      message: '获取消息失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// @desc    Get conversation with a specific user
// @route   GET /api/messages/conversation/:userId
// @access  Private
export const getConversation = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    const Message = (global as any).Message;
    
    const currentUserId = req.user.id
    const otherUserId = Number(req.params.userId)

    // Check if other user exists
    const otherUser = await User.findByPk(otherUserId)
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Get conversation between current user and other user
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: Number(currentUserId), recipientId: otherUserId },
          { senderId: otherUserId, recipientId: Number(currentUserId) }
        ]
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'recipient', attributes: ['id', 'username', 'email'] }
      ],
      order: [['createdAt', 'ASC']]
    })

    // Mark all received messages as read
    await Message.update(
      { isRead: true },
      {
        where: {
          senderId: otherUserId,
          recipientId: Number(currentUserId),
          isRead: false
        }
      }
    )

    res.status(200).json({
      message: 'Conversation retrieved successfully',
      data: messages
    })
  } catch (error) {
    console.error('Error in getConversation:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Mark message as read
// @route   PUT /api/messages/:messageId/read
// @access  Private
export const markAsRead = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    const Message = (global as any).Message;
    
    const messageId = Number(req.params.messageId)
    const userId = req.user.id

    // Check if message exists and belongs to the user
    const message = await Message.findOne({
      where: {
        id: messageId,
        recipientId: Number(userId)
      }
    })

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    // Mark as read
    await message.update({ isRead: true })
    await message.save()

    res.status(200).json({
      message: 'Message marked as read',
      data: message
    })
  } catch (error) {
    console.error('Error in markAsRead:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete message
// @route   DELETE /api/messages/:messageId
// @access  Private
export const deleteMessage = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    const Message = (global as any).Message;
    
    const messageId = Number(req.params.messageId)
    const userId = req.user.id

    // Check if message exists and belongs to the user (sender or recipient)
    const message = await Message.findOne({
      where: {
        id: messageId,
        [Op.or]: [
          { senderId: Number(userId) },
          { recipientId: Number(userId) }
        ]
      }
    })

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    // Delete message
    await message.destroy()

    res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    console.error('Error in deleteMessage:', error)
    res.status(500).json({ message: 'Server error' })
  }
}