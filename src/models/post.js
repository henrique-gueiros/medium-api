import BaseModel from "./base.js";

export default class Post extends BaseModel {
    static load(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                text: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                summary: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                total_likes: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                published_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                is_deleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            }, {
            sequelize,
            modelName: 'post',
            tableName: 'posts',
            timestamps: true,  
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
        )
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}