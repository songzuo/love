import { Request, Response } from 'express'
import { Op } from 'sequelize'

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getCurrentUser = async (req: any, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error in getCurrentUser:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: any, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const { username, email } = req.body

    // Check if username or email is already taken by another user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
        id: { [Op.ne]: req.user.id }
      }
    })
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Update user
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.update({ username, email })
    await user.save()

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    })
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    console.error('Error in updateUserProfile:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get all users for browsing
// @route   GET /api/users
// @access  Private
export const getUsers = async (req: any, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const users = await User.findAll({ where: { id: { [Op.ne]: req.user.id } } })
    // 确保返回纯JavaScript对象而不是Sequelize实例
    const plainUsers = users.map((user: any) => user.toJSON ? user.toJSON() : user)
    
    // 直接返回数组给前端
    res.status(200).json(plainUsers)
  } catch (error) {
    console.error('Error in getUsers:', error)
    res.status(500).json({ 
      success: false,
      message: '获取用户列表失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req: any, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    const users = await User.findAll()
    // 确保返回纯JavaScript对象而不是Sequelize实例
    const plainUsers = users.map((user: any) => user.toJSON ? user.toJSON() : user)
    
    // 返回明确的数据结构
    res.status(200).json({
      success: true,
      users: plainUsers,
      count: plainUsers.length
    })
  } catch (error) {
    console.error('Error in getAllUsers:', error)
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
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