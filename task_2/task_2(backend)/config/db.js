const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const mySqlPool = mysql.createPool({
    host: process.env.myHost,
    user: process.env.mySqlUser,
    password: process.env.mySqlPassword,
    database: process.env.database
});

module.exports = mySqlPool;