

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('yearofmake', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          year: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          modeel_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'yearofmake',

    });
}


  