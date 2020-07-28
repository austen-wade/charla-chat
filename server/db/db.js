const { Client } = require("pg");
const { DB_PORT, DB_NAME, DB_USER, DB_HOST, DB_PASS } = process.env;

const client = new Client({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

client.query(`SELECT * FROM chat_user`, (err, res) => {
    console.log({ users: res.rows });
    client.end();
});

module.exports = client;
