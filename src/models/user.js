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
                nome: {
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
                }
            },
            {
                sequelize,
                modelName: 'User',
                timestamps: true, //criatedAt e updatedAt
            }
        );
    }
}