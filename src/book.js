const Book = require("../models/book");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  typeDef: `
  type Book {
    title: String!
    author: Author
    published: String!
    genres: [String]!
    id: ID!
  }`,
  resolvers: {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      allBooks: async (root, args) => {
        let books = await Book.find({}).populate("author");

        // filter out books not by author
        if (args.author) {
          books = books.filter(
            (book) => book.author && book.author.name === args.author
          );
        }

        // filter out books not in genre
        if (args.genre) {
          books = books.filter(
            (book) => book.genres && book.genres.includes(args.genre)
          );
        }

        // paginate
        if (args.start >= 0 && args.end) {
          try {
            books = books.slice(args.start, args.end);
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            });
          }
        }

        return books;
      },
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        let author = await Author.findOne({ name: args.author });

        if (!currentUser) throw new AuthenticationError("Not authenticated");

        if (!author) {
          author = new Author({ name: args.author, born: null });
          try {
            await author.save();
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            });
          }
        }

        const book = new Book({ ...args, author });

        try {
          return book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      },
    },
  },
};
