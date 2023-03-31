require('dotenv').config();
const PORT = process.env.PORT;

module.exports = {
    PORT: 8080,
    JWT_SECRET: 'your jwt secret'
};
