"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorites = void 0;
// @desc    Get all favorites for current user
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
    try {
        console.log('=== getFavorites called ===');
        console.log('Request headers:', { authorization: req.headers.authorization?.substring(0, 20) + '...' });
        console.log('User from req:', req.user);
        // 获取全局对象
        console.log('Global object keys:', Object.keys(global));
        // 获取模型
        const User = global.User;
        const Favorite = global.Favorite;
        const sequelize = global.sequelize;
        console.log('Models status:', {
            sequelize: !!sequelize,
            User: !!User,
            Favorite: !!Favorite
        });
        // 检查数据库连接
        if (sequelize) {
            try {
                await sequelize.authenticate();
                console.log('Database connection is healthy');
            }
            catch (dbError) {
                console.error('Database connection error:', dbError);
            }
        }
        // 检查用户是否已认证
        if (!req.user || !req.user.id) {
            console.error('User not authenticated or missing id');
            return res.status(200).json([]);
        }
        const currentUserId = req.user.id;
        console.log('Current user ID:', currentUserId);
        // 检查Favorite模型是否存在
        if (!Favorite) {
            console.error('Favorite model not found - checking if it exists in sequelize models');
            // 尝试从sequelize实例中获取模型
            if (sequelize) {
                console.log('Available sequelize models:', Object.keys(sequelize.models));
            }
            return res.status(200).json([]);
        }
        // 检查User模型是否存在
        if (!User) {
            console.error('User model not found');
            return res.status(200).json([]);
        }
        // 尝试获取收藏列表
        try {
            console.log('Attempting to find favorites for user:', currentUserId);
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
            const plainFavorites = favorites.map((favorite) => {
                const fav = favorite.toJSON ? favorite.toJSON() : favorite;
                return {
                    ...fav,
                    favoritedUser: fav.favoritedUser || {}
                };
            });
            // 直接返回数组给前端
            res.status(200).json(plainFavorites);
        }
        catch (findError) {
            console.error('Error finding favorites:', findError);
            console.error('Find error stack:', findError?.stack || 'No stack available');
            // 如果是表不存在的错误，尝试手动创建表
            if (findError instanceof Error && findError.message.includes('relation "favorites" does not exist')) {
                console.log('Attempting to create missing favorites table...');
                try {
                    await Favorite.sync({ force: false });
                    console.log('Favorites table created successfully');
                    // 再次尝试获取收藏列表
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
                    res.status(200).json(favorites.map((f) => f.toJSON()));
                }
                catch (createError) {
                    console.error('Failed to create favorites table:', createError);
                    res.status(200).json([]);
                }
            }
            else {
                res.status(200).json([]);
            }
        }
    }
    catch (error) {
        console.error('Unexpected error in getFavorites:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        // Return empty array to prevent frontend map/filter errors
        return res.status(200).json([]);
    }
};
exports.getFavorites = getFavorites;
// @desc    Add a user to favorites
// @route   POST /api/favorites/:userId
// @access  Private
const addFavorite = async (req, res) => {
    try {
        console.log('addFavorite called with user:', req.user?.id);
        // 获取模型
        const User = global.User;
        let Favorite = global.Favorite;
        // 检查用户是否已认证
        if (!req.user || !req.user.id) {
            console.error('User not authenticated or missing id');
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        // 如果Favorite模型不存在，创建一个简单的实现
        if (!Favorite) {
            // 尝试创建临时的Favorite模型（仅用于演示，实际项目中需要在模型定义中创建）
            const sequelize = global.sequelize;
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
                global.Favorite = Favorite;
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
    }
    catch (error) {
        console.error('Error in addFavorite:', error);
        res.status(500).json({
            success: false,
            message: '添加收藏失败',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.addFavorite = addFavorite;
// @desc    Remove a user from favorites
// @route   DELETE /api/favorites/:userId
// @access  Private
const removeFavorite = async (req, res) => {
    try {
        console.log('removeFavorite called with user:', req.user?.id);
        // 获取模型
        const Favorite = global.Favorite;
        // 检查用户是否已认证
        if (!req.user || !req.user.id) {
            console.error('User not authenticated or missing id');
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
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
    }
    catch (error) {
        console.error('Error in removeFavorite:', error);
        res.status(500).json({
            success: false,
            message: '取消收藏失败',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.removeFavorite = removeFavorite;
//# sourceMappingURL=favoriteController.js.map