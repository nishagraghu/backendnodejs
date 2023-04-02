const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('mobil_user', {
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
        mobile: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        otp:{
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [6, 6]
            }
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
           
        },
      
    },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: 'mobil_user',

        });
}






