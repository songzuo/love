const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  // 实例方法：比较密码
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // 静态方法：在创建或更新用户之前加密密码
  static async beforeSave(user) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS || 10));
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
}

const UserModel = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'username',
          msg: 'Username already exists'
        },
        validate: {
          notEmpty: {
            msg: 'Please provide a username'
          },
          len: {
            args: [3, 50],
            msg: 'Username must be between 3 and 50 characters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'Email already exists'
        },
        validate: {
          notEmpty: {
            msg: 'Please provide an email'
          },
          isEmail: {
            msg: 'Please provide a valid email'
          }
        },
        set(value) {
          this.setDataValue('email', value.toLowerCase());
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a password'
          },
          len: {
            args: [6, 100],
            msg: 'Password must be at least 6 characters'
          }
        }
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeSave: User.beforeSave
      }
    }
  );

  return User;
};

module.exports = UserModel;