const db = require("../db/db.js");
const bcrypt = require("bcryptjs");
const { PubSub } = require("apollo-server-express");

const pubSub = new PubSub();

const MESSAGE_CREATED = "MESSAGE_CREATED";

const resolvers = {
    Query: {
        users: async () =>
            await (await db.query(`SELECT * FROM chat_user`)).rows,
        messages: async () => {
            return await (await db.query(`SELECT * FROM messages`)).rows;
        },
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
        addMessage: async (parent, { content }, ctx) => {
            const querydb = await db.query(
                `INSERT INTO messages(content) VALUES($1) RETURNING content`,
                [content]
            );
            pubSub.publish(MESSAGE_CREATED, {
                messageCreated: { message: querydb.rows[0] },
            });
            return querydb.rows[0];
        },
    },
    Subscription: {
        messageCreated: {
            subscribe: () => {
                return pubSub.asyncIterator([MESSAGE_CREATED]);
            },
        },
    },
};

module.exports = resolvers;
