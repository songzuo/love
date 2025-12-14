import { Request, Response } from 'express'
import { Op } from 'sequelize'

// @desc    Get recommended matches for current user
// @route   GET /api/matches
// @access  Private
export const getMatches = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    const currentUserId = req.user.id;
    
    // 获取除当前用户外的所有活跃用户作为推荐
    const matches = await User.findAll({
      where: {
        id: { [Op.ne]: currentUserId }, // 排除当前用户
        status: 'active' // 只返回活跃用户
      },
      attributes: ['id', 'username', 'email', 'role', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    
    // 确保返回纯JavaScript对象
    const plainMatches = matches.map((user: any) => user.toJSON ? user.toJSON() : user);
    
    // 直接返回数组给前端
    res.status(200).json(plainMatches);
  } catch (error) {
    console.error('Error in getMatches:', error);
    res.status(500).json({ 
      success: false,
      message: '获取推荐用户失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// @desc    Like a user (send friend request)
// @route   POST /api/matches/:userId/like
// @access  Private
export const likeUser = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    const Like = (global as any).Like || (global as any).FriendRequest; // 兼容不同的模型命名
    
    const currentUserId = req.user.id;
    const targetUserId = Number(req.params.userId);
    
    // 检查目标用户是否存在
    const targetUser = await User.findByPk(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 检查是否已经喜欢过该用户
    const existingLike = await Like.findOne({
      where: {
        [Op.or]: [
          { senderId: currentUserId, recipientId: targetUserId },
          { senderId: targetUserId, recipientId: currentUserId }
        ]
      }
    });
    
    if (existingLike) {
      return res.status(400).json({ message: '已经喜欢过该用户' });
    }
    
    // 创建喜欢记录
    await Like.create({
      senderId: currentUserId,
      recipientId: targetUserId,
      status: 'pending'
    });
    
    res.status(201).json({ message: '喜欢成功' });
  } catch (error) {
    console.error('Error in likeUser:', error);
    res.status(500).json({ message: '操作失败', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
