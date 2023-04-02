const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('partdetail', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          partnumber: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          partname: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          partdiscription: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
          },
          partprice: {
            type: DataTypes.FLOAT,
            allowNull: true,
          },
          partimage: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
          },
          variant_id: {
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
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'partdetails',

});
};


