import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


const mySqlPool = mysql.createPool({
    host: process.env.myHost,
    user: process.env.mySqlUser,
    password: process.env.mySqlPassword,
    database: process.env.database
});

export default mySqlPool;