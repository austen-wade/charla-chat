const db = require("../db/db.js");
const bcrypt = require("bcryptjs");

const resolvers = {
    Query: {
        users: async () =>
            await (await db.query(`SELECT * FROM chat_user`)).rows,
    },
    Mutation: {
        addUser: async (_, req) => {
            const { handle, email } = req;

            const existingQuery = await db.query(
                `SELECT handle, email FROM chat_user WHERE handle = $1 OR email = $2`,
                [handle, email]
            );

            if (existingQuery.rows[0]) {
                const existingUser = [];
                existingUser.concat(existingQuery.rows[0]);
                return existingQuery.rows[0];
            }

            const salt = bcrypt.genSaltSync(10);
            const passhash = bcrypt.hashSync(req.password, salt);

            const userFromDb = await db.query(
                `INSERT INTO chat_user(handle, email, salt, passhash) VALUES($1, $2, $3, $4) RETURNING handle, email`,
                [handle, email, salt, passhash]
            );

            return userFromDb.rows[0];
        },
    },
};

module.exports = resolvers;
