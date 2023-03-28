const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: dbConfig.HOST,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB  
  });

  const modelDefiners = [
	 require('./sequelizeModel/PartDetail.model'),
	// require('./models/instrument.model'),
	// require('./models/orchestra.model'),
	// Add more models here...
	// require('./models/item'),
];
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}
module.exports = sequelize;
  