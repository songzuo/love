import { Request, Response } from 'express'
import { Op } from 'sequelize'

// @desc    Get all users (public access for testing)
// @route   GET /api/public-admin/users
// @access  Public (for testing purposes only)
export const getAllUsers = async (req: any, res: Response) => {
  try {
    console.log('=== Public Admin getAllUsers called ===');
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    
    // 检查User模型是否可用
    const User = (global as any).User;
    if (!User) {
      console.error('User model not available');
      return res.status(500).json({ 
        success: false,
        message: 'User model not available',
        error: 'User model not initialized'
      });
    }
    
    console.log('Fetching users from database...');
    const users = await User.findAll();
    console.log('Users fetched:', users);
    
    // 确保返回纯JavaScript对象而不是Sequelize实例
    const plainUsers = users.map((user: any) => {
      if (user.toJSON) {
        return user.toJSON();
      }
      return user;
    });
    
    console.log('Plain users:', plainUsers);
    
    // 返回明确的数据结构
    const response = {
      success: true,
      users: plainUsers,
      count: plainUsers.length
    };
    
    console.log('Sending response:', response);
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Error in getAllUsers:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // 检查特定的数据库错误
    if (error.name === 'SequelizeConnectionRefusedError') {
      console.error('Database connection refused');
      return res.status(500).json({
        success: false,
        message: 'Database connection error',
        error: 'Unable to connect to database'
      });
    }
    
    if (error.name === 'SequelizeHostNotFoundError') {
      console.error('Database host not found');
      return res.status(500).json({
        success: false,
        message: 'Database host error',
        error: 'Database host not found'
      });
    }
    
    // 确保始终返回JSON格式的响应
    const errorResponse = {
      success: false,
      message: 'Server error occurred while fetching users',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    // 在开发环境中包含堆栈跟踪
    if (process.env.NODE_ENV === 'development') {
      (errorResponse as any).stack = error.stack;
    }
    
    res.status(500).json(errorResponse);
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