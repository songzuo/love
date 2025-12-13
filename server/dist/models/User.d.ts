import { Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
export type UserAttributes = InferAttributes<User>;
export type UserCreationAttributes = InferCreationAttributes<User, {
    omit: 'id' | 'createdAt' | 'updatedAt' | 'comparePassword';
}>;
declare class User extends Model<UserAttributes, UserCreationAttributes> {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const UserModel: (sequelize: Sequelize) => typeof User;
export default UserModel;
//# sourceMappingURL=User.d.ts.map