const { Pool } = require("pg");
const { DB_PORT, DB_NAME, DB_USER, DB_HOST, DB_PASS } = process.env;

const pool = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect();

module.exports = {
    query: (text, params) => pool.query(text, params),
};
