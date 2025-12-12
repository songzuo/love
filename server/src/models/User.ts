import { Model, DataTypes, Sequelize } from 'sequelize'
import bcrypt from 'bcryptjs'

interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'comparePassword'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public role!: 'user' | 'admin'
  public status!: 'active' | 'inactive'
  public createdAt!: Date
  public updatedAt!: Date

  // 实例方法：比较密码
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
  }
}

const UserModel = (sequelize: Sequelize) => {
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
        set(value: string) {
          this.setDataValue('email', value.toLowerCase())
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
      timestamps: true
    }
  )

  // 在创建或更新用户之前加密密码
  User.addHook('beforeSave', async (user: User) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS || 10))
      user.password = await bcrypt.hash(user.password, salt)
    }
  })

  return User
}

export type { UserAttributes, UserCreationAttributes }
export default UserModel