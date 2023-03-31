require('dotenv').config();

const { NODE_ENV, HOST, USER, PASSWORD, DB } = process.env;

if (NODE_ENV === 'test') {
  module.exports = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: process.env.DB,
  };

} else {

  module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "backendvahicleparts"
  };

}


