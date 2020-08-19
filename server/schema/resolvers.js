const db = require("../db/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PubSub, AuthenticationError } = require("apollo-server-express");
const { ForbiddenError, skip } = require("apollo-server");

const pubSub = new PubSub();

const MESSAGE_CREATED = "MESSAGE_CREATED";

const createToken = async (user, secret) => {
    const { user_id, email, handle } = user;
    return await jwt.sign({ user_id, email, handle }, secret);
};

const checkPassword = (returnedPassword, inputPassword) => {
    return bcrypt.compareSync(inputPassword, returnedPassword); //input, passhash
};

const resolvers = {
    Query: {
        currentUser: async (_, args, { user }) => {
            return await user;
        },
        users: async (_, args) => {
            if (args.handle || args.user_id || args.email) {
                return await (
                    await db.query(
                        `SELECT * FROM chat_user WHERE handle = $1 OR email = $2 OR user_id = $3`,
                        [args.handle, args.email, args.user_id]
                    )
                ).rows;
            }
            return await (await db.query(`SELECT * FROM chat_user`)).rows;
        },
        messages: async () => {
            return await (
                await db.query(`SELECT * FROM messages, chat_user WHERE messages.user_id = chat_user.user_id;
            `)
            ).rows;
        },
    },
    Mutation: {
        addUser: async (_, req) => {
            const { handle, email, password } = req;

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
            const passhash = bcrypt.hashSync(password, salt);

            const userFromDb = await db.query(
                `INSERT INTO chat_user(handle, email, salt, passhash) VALUES($1, $2, $3, $4) RETURNING handle, email, user_id`,
                [handle, email, salt, passhash]
            );
            return userFromDb.rows[0];
            //return { token: createToken(userFromDb.rows[0], secret) };
        },
        loginUser: async (parent, { email, handle, password }, { secret }) => {
            const querydb = await db.query(
                `SELECT handle, email, passhash, user_id FROM chat_user WHERE handle = $1 OR email = $2`,
                [handle, email]
            );
            const userData = querydb.rows[0];
            const passwordIsValid = checkPassword(userData.passhash, password);
            if (!passwordIsValid) {
                throw new AuthenticationError("Password is invalid");
            }
            return { token: createToken(userData, secret), user: userData };
        },
        addMessage: async (parent, { content }, { user }) => {
            user ? skip : new ForbiddenError("Not authenticated as user.");
            const querydb = await db.query(
                `INSERT INTO messages(content, user_id) VALUES($1, $2) RETURNING content, user_id`,
                [content, user.user_id]
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
