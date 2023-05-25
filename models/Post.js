// Import Model parent class and enumerator from sequelize library
const { Model, DataTypes } = require('sequelize');

// Import sequelize connection
const sequelize = require('../config/connection');

// Extend Model parent class
class Post extends Model {}

// Define Post model properties
Post.init(
    // Define columns
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdOn: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        // User ID FK
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;