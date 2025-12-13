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

// @desc    Get basic admin statistics
// @route   GET /api/admin/statistics
// @access  Private/Admin
export const getStatistics = async (req: Request, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    // 计算日期范围
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    
    // 查询各种统计数据
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { status: 'active' } });
    const inactiveUsers = await User.count({ where: { status: 'inactive' } });
    const adminUsers = await User.count({ where: { role: 'admin' } });
    const newUsersToday = await User.count({ where: { createdAt: { [Op.gte]: today } } });
    const newUsersThisWeek = await User.count({ where: { createdAt: { [Op.gte]: weekAgo } } });
    
    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      newUsersToday,
      newUsersThisWeek
    });
  } catch (error) {
    console.error('Error in getStatistics:', error);
    res.status(500).json({ message: '获取统计数据失败' });
  }
}

// @desc    Get detailed admin statistics
// @route   GET /api/admin/statistics/detailed
// @access  Private/Admin
export const getDetailedStatistics = async (req: Request, res: Response) => {
  try {
    // 获取User模型
    const User = (global as any).User;
    
    // 计算日期范围
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    
    // 查询基本统计数据
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { status: 'active' } });
    const inactiveUsers = await User.count({ where: { status: 'inactive' } });
    const adminUsers = await User.count({ where: { role: 'admin' } });
    const regularUsers = await User.count({ where: { role: 'user' } });
    const newUsersToday = await User.count({ where: { createdAt: { [Op.gte]: today } } });
    const newUsersThisWeek = await User.count({ where: { createdAt: { [Op.gte]: weekAgo } } });
    const newUsersThisMonth = await User.count({ where: { createdAt: { [Op.gte]: monthAgo } } });
    
    // 查询用户增长趋势数据（过去7天）
    const userGrowth = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      
      const count = await User.count({ 
        where: { 
          createdAt: { 
            [Op.gte]: date, 
            [Op.lt]: nextDate 
          } 
        } 
      });
      
      userGrowth.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      regularUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      userGrowth
    });
  } catch (error) {
    console.error('Error in getDetailedStatistics:', error);
    res.status(500).json({ message: '获取统计数据失败' });
  }
}