const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		id: ID!
		title: String!
	}

	type Author {
		name: String!
		books: [Book]
	}

	type Query {
		books: [Book]
		authors: [Author]
	}

	type Mutation {
		addBook(id: ID!, title: String!): Book
	}
`;

module.exports = typeDefs;
