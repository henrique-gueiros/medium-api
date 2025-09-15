import BaseModel from './base.js';

export default class User extends BaseModel {
    static load(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,

                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,

                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                is_deleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                }
            },
            {
                sequelize,
                modelName: 'user',
                tableName: 'users',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    }
}