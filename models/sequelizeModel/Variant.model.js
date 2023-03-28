const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('variant', {
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
          year_make: {
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

    },{
        tableName: 'variant',
        timestamps: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,

    });
}