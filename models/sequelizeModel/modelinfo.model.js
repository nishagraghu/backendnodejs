// CREATE TABLE `modeinfo` (
//     `id` int(10) UNSIGNED NOT NULL,
//     `name` varchar(255) NOT NULL,
//     `brand_id` int(11) DEFAULT NULL,
//     `images` text DEFAULT NULL,
//     `created_at` timestamp NULL DEFAULT NULL,
//     `updated_at` timestamp NULL DEFAULT NULL,
//     `deleted_at` timestamp NULL DEFAULT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('modelinfo', {
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

