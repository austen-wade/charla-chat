const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        handle: String!
        email: String!
        password: String!
    }

    type Message {
        content: String
    }

    type Query {
        users: [User]
        messages: [Message]
    }

    type Mutation {
        addUser(handle: String!, email: String!, password: String!): User
        addMessage(content: String!): Message
    }

    type Subscription {
        messageCreated: MessageCreated!
    }

    type MessageCreated {
        message: Message!
    }
`;

module.exports = typeDefs;
