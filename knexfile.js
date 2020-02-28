require('dotenv').config();

module.exports = { client: 'mysql2', connection: process.env.DATABASE_URL };
