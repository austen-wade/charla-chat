const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        handle: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(handle: String!, email: String!, password: String!): User
    }
`;

module.exports = typeDefs;
