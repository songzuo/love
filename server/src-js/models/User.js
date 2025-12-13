"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    // 实例方法：比较密码
    async comparePassword(candidatePassword) {
        return bcryptjs_1.default.compare(candidatePassword, this.password);
    }
}
const UserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
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
            type: sequelize_1.DataTypes.STRING,
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
            type: sequelize_1.DataTypes.STRING,
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
            type: sequelize_1.DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: true
    });
    // 在创建或更新用户之前加密密码
    User.addHook('beforeSave', async (user) => {
        if (user.changed('password')) {
            const salt = await bcryptjs_1.default.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS || 10));
            user.password = await bcryptjs_1.default.hash(user.password, salt);
        }
    });
    return User;
};
exports.default = UserModel;
//# sourceMappingURL=User.js.map