require('dotenv').config();
const { NODE_ENV, PORT, JWT_SECRET } = process.env;
module.exports = {
    PORT: parseInt(PORT),
    JWT_SECRET: JWT_SECRET
};
