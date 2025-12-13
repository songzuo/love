import { Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';
export type FavoriteAttributes = InferAttributes<Favorite>;
export type FavoriteCreationAttributes = InferCreationAttributes<Favorite, {
    omit: 'id' | 'createdAt' | 'updatedAt';
}>;
declare class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> {
    id: number;
    userId: number;
    favoritedUserId: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const FavoriteModel: (sequelize: Sequelize) => typeof Favorite;
export default FavoriteModel;
//# sourceMappingURL=Favorite.d.ts.map