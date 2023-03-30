

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('modeinfo', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          images: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },

    },
    {
        timestamps: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'modelinfo',

    });
}

