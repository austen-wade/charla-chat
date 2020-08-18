const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        handle: String!
        email: String!
        password: String!
        user_id: String!
    }

    type Message {
        content: String
        user_id: String
        handle: String
        user: User
    }

    type Token {
        token: String!
    }

    type Query {
        currentUser: User!
        users(handle: String, email: String, user_id: String): [User]
        messages: [Message]
    }

    type Mutation {
        addUser(handle: String!, email: String!, password: String!): User
        loginUser(handle: String, email: String, password: String!): Token!
        addMessage(content: String!): Message
    }

    type Subscription {
        messageCreated: MessageCreated
    }

    type MessageCreated {
        message: Message
    }
`;

module.exports = typeDefs;
