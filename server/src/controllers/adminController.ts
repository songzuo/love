import { Request, Response } from 'express'
import { Op } from 'sequelize'

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
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

// @desc    Update user status (admin only)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const { id } = req.params
    const { status } = req.body

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const user = await User.findByPk(Number(id))
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.update({ status })
    await user.save()

    res.status(200).json({
      message: 'User status updated successfully',
      user
    })
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    console.error('Error in updateUserStatus:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const { id } = req.params

    const user = await User.findByPk(Number(id))
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.destroy()
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error in deleteUser:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Promote user to admin (admin only)
// @route   PUT /api/admin/users/:id/promote
// @access  Private/Admin
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

// @desc    Demote admin to user (admin only)
// @route   PUT /api/admin/users/:id/demote
// @access  Private/Admin
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