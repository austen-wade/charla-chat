const { Pool } = 'pg';

const authors = [
	{
		name: 'J.K. Rowling',
		books: [{ title: 'Harry Potter and the Chamber of Secrets' }],
	},
];

const books = [
	{
		id: 1,
		title: 'Harry Potter and the Chamber of Secrets',
		author: 'J.K. Rowling',
	},
	{
		id: 2,
		title: 'Jurassic Park',
		author: 'Michael Crichton',
	},
];

const resolvers = {
	Query: {
		books: () => books,
		authors: () => authors,
	},
	Mutation: {
		addBook: (_, req) => {
			const existingBook = books.find((book) => book.id === req.id);
			if (!existingBook) {
				const newBook = { id: req.id, title: req.title };
				books.push(newBook);
				return newBook;
			}
			return existingBook;
		},
	},
};

module.exports = resolvers;
