const { DataTypes } = require('sequelize');
const connection = require('../database');

const Task = connection.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pendente', 'concluida', 'cancelada'),
            allowNull: false,
            defaultValue: 'pendente',
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'tasks',
        underscored: true,
        timestamps: true,
    }
);

module.exports = Task;