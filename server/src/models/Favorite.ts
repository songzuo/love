import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize'

// 使用InferAttributes和InferCreationAttributes来正确推断模型属性类型
export type FavoriteAttributes = InferAttributes<Favorite>
export type FavoriteCreationAttributes = InferCreationAttributes<Favorite, { omit: 'id' | 'createdAt' | 'updatedAt' }>

class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> {
  // 数据库字段
  declare id: number
  declare userId: number
  declare favoritedUserId: number
  declare createdAt: Date
  declare updatedAt: Date
}

const FavoriteModel = (sequelize: Sequelize) => {
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      favoritedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createdAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updatedAt'
      }
    },
    {
      sequelize,
      tableName: 'favorites',
      timestamps: true,
      underscored: false
    }
  )

  return Favorite
}

export default FavoriteModel