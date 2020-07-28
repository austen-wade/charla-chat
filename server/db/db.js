const { Client } = require('pg');

const client = new Client({
    host: `localhost`,
    port: `5432`,
    user: 'postgres',
    password: 'Shoes112',
});

client.connect();

client.query(`SELECT * FROM chat_user`, (err, res) => {
    console.log({ res: res.rows[0] });
        client.end();
})

module.exports = client;