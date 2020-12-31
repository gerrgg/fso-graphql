const Author = require("../models/author");

module.exports = {
  typeDef: `
  type Author {
    name: String
    bookCount: Int!
    born: Int
    id: ID!
  }`,
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return author.books ? author.books.length : 0;
    },
  },
  resolvers: {
    Query: {
      authorCount: () => Author.collection.countDocuments(),

      allAuthors: async (root, args) => {
        let authors = await Author.find({});

        if (args.start >= 0 && args.end) {
          try {
            authors = authors.slice(args.start, args.end);
          } catch (error) {
            console.error(error);
          }
        }

        return authors;
      },
      findAuthor: (root, args) => Author.findOne({ name: args.name }),
    },
    Mutation: {
      addAuthor: (root, args) => {
        const author = new Author({ ...args });
        try {
          return author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      },

      editAuthor: async (root, args, { currentUser }) => {
        const author = await Author.findOne({ name: args.name });

        if (!currentUser) throw new AuthenticationError("Not authenticated");

        try {
          author.born = args.born;
          return author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      },
    },
  },
};
