// Import Model parent class and enumerator from sequelize library
const { Model, DataTypes } = require('sequelize');

// Import sequelize connection
const sequelize = require('../config/connection');

// Extend Model parent class
class Comment extends Model {}

// Define Comment model properties
Comment.init(
    // Define columns
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        // Post ID FK
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
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
        modelName: 'comment'
    }
);

module.exports = Comment;