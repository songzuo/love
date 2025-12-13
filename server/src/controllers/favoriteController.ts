import { Request, Response } from 'express'
import { Op } from 'sequelize'

// @desc    Get all favorites for current user
// @route   GET /api/favorites
// @access  Private
export const getFavorites = async (req: any, res: Response) => {
  try {
    console.log('getFavorites called with user:', req.user?.id);
    // 获取模型
    const User = (global as any).User;
    const Favorite = (global as any).Favorite;
    const currentUserId = req.user.id;
    
    console.log('User model found:', !!User);
    console.log('Favorite model found:', !!Favorite);
    
    // 检查Favorite模型是否存在
    if (!Favorite) {
      console.error('Favorite model not found');
      return res.status(200).json({ 
        success: true,
        favorites: [],
        count: 0
      });
    }
    
    // 获取当前用户的所有收藏
    const favorites = await Favorite.findAll({
      where: {
        userId: currentUserId
      },
      include: [
        {
          model: User,
          as: 'favoritedUser',
          attributes: ['id', 'username', 'email', 'role', 'status', 'createdAt']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    console.log('Favorites found:', favorites.length);
    // 确保返回纯JavaScript对象
    const plainFavorites = favorites.map((favorite: any) => {
      const fav = favorite.toJSON ? favorite.toJSON() : favorite;
      return {
        ...fav,
        favoritedUser: fav.favoritedUser || {}
      };
    });
    
    res.status(200).json({
      success: true,
      favorites: plainFavorites,
      count: plainFavorites.length
    });
  } catch (error) {
    console.error('Error in getFavorites:', error);
    res.status(500).json({ 
      success: false,
      message: '获取收藏列表失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// @desc    Add a user to favorites
// @route   POST /api/favorites/:userId
// @access  Private
export const addFavorite = async (req: any, res: Response) => {
  try {
    // 获取模型
    const User = (global as any).User;
    let Favorite = (global as any).Favorite;
    
    // 如果Favorite模型不存在，创建一个简单的实现
    if (!Favorite) {
      // 尝试创建临时的Favorite模型（仅用于演示，实际项目中需要在模型定义中创建）
      const sequelize = (global as any).sequelize;
      if (sequelize) {
        const DataTypes = require('sequelize').DataTypes;
        Favorite = sequelize.define('Favorite', {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          favoritedUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
          }
        }, {
          timestamps: true
        });
        (global as any).Favorite = Favorite;
      }
    }
    
    const currentUserId = req.user.id;
    const targetUserId = Number(req.params.userId);
    
    // 检查目标用户是否存在
    const targetUser = await User.findByPk(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 检查是否已经收藏过该用户
    const existingFavorite = await Favorite.findOne({
      where: {
        userId: currentUserId,
        favoritedUserId: targetUserId
      }
    });
    
    if (existingFavorite) {
      return res.status(400).json({ message: '已经收藏过该用户' });
    }
    
    // 创建收藏记录
    await Favorite.create({
      userId: currentUserId,
      favoritedUserId: targetUserId
    });
    
    res.status(201).json({ 
      success: true,
      message: '添加收藏成功'
    });
  } catch (error) {
    console.error('Error in addFavorite:', error);
    res.status(500).json({ 
      success: false,
      message: '添加收藏失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// @desc    Remove a user from favorites
// @route   DELETE /api/favorites/:userId
// @access  Private
export const removeFavorite = async (req: any, res: Response) => {
  try {
    // 获取模型
    const Favorite = (global as any).Favorite;
    
    // 检查Favorite模型是否存在
    if (!Favorite) {
      return res.status(404).json({ 
        success: false,
        message: '收藏功能未实现'
      });
    }
    
    const currentUserId = req.user.id;
    const targetUserId = Number(req.params.userId);
    
    // 查找并删除收藏记录
    const result = await Favorite.destroy({
      where: {
        userId: currentUserId,
        favoritedUserId: targetUserId
      }
    });
    
    if (result === 0) {
      return res.status(404).json({ message: '收藏记录不存在' });
    }
    
    res.status(200).json({ 
      success: true,
      message: '取消收藏成功'
    });
  } catch (error) {
    console.error('Error in removeFavorite:', error);
    res.status(500).json({ 
      success: false,
      message: '取消收藏失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
