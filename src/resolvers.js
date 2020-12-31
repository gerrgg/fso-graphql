const { UserInputError, AuthenticationError } = require("apollo-server");

const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
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

    allUsers: async (root, args) => User.find({}),

    findAuthor: (root, args) => Author.findOne({ name: args.name }),

    me: (root, args, { currentUser }) => currentUser,
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return author.books ? author.books.length : 0;
    },
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

    editUser: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated");

      const user = await User.findById(currentUser._id);

      try {
        user.favoriteGenre = args.favoriteGenre;
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

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

    createUser: (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};
