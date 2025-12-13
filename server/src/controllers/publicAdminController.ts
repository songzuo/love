import { Request, Response } from 'express'
import { Op } from 'sequelize'

// @desc    Get all users (public access for testing)
// @route   GET /api/public-admin/users
// @access  Public (for testing purposes only)
export const getAllUsers = async (req: any, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    console.error('Error in getAllUsers:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Promote user to admin (public access for testing)
// @route   PUT /api/public-admin/users/:id/promote
// @access  Public (for testing purposes only)
export const promoteToAdmin = async (req: Request, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const { id } = req.params

    const user = await User.findByPk(Number(id))
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if user is already admin
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' })
    }

    await user.update({ role: 'admin' })
    await user.save()

    res.status(200).json({
      message: 'User promoted to admin successfully',
      user
    })
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    console.error('Error in promoteToAdmin:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Demote admin to user (public access for testing)
// @route   PUT /api/public-admin/users/:id/demote
// @access  Public (for testing purposes only)
export const demoteToUser = async (req: Request, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const { id } = req.params

    const user = await User.findByPk(Number(id))
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if user is already a regular user
    if (user.role === 'user') {
      return res.status(400).json({ message: 'User is already a regular user' })
    }

    // Prevent demoting the last admin
    const adminCount = await User.count({ where: { role: 'admin' } });
    if (adminCount <= 1) {
      return res.status(400).json({ message: 'Cannot demote the last admin' });
    }

    await user.update({ role: 'user' })
    await user.save()

    res.status(200).json({
      message: 'Admin demoted to user successfully',
      user
    })
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    console.error('Error in demoteToUser:', error)
    res.status(500).json({ message: 'Server error' })
  }
}