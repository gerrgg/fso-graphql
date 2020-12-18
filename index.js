require("dotenv").config();

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//models
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

// graphql and ApolloServer
const { ApolloServer, UserInputError, gql } = require("apollo-server");
const user = require("./models/user");

// connect to db
require("./utils/database");

// Schema
const typeDefs = gql`
  type Book {
    title: String!
    author: Author
    published: String!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String
    bookCount: Int!
    born: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(start: Int, end: Int, author: String, genre: String): [Book!]
    allAuthors(start: Int, end: Int): [Author!]!
    allUsers: [User!]
    findAuthor(name: String!): Author
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!

    addAuthor(name: String!, bookCount: Int!, born: Int): Author!

    editAuthor(name: String!, born: Int!): Author

    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
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

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.born;
      return author.save();
    },

    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && autho.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { createUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
