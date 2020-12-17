require("dotenv").config();

// create unique ids
const { v1: uuid } = require("uuid");

//models
const Book = require("./models/book");
const Author = require("./models/author");

// graphql and ApolloServer
const { ApolloServer, gql } = require("apollo-server");

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(first: Int, author: String, genre: String): [Book!]
    allAuthors(first: Int): [Author!]!
    findAuthor(name: String!): Author
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

      // filter out books not in genre
      if (args.first && books.length > args.first) {
        books = books.slice(0, 10);
      }

      return books;
    },
    allAuthors: () => Author.find({}),
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
      return author.save();
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
        await author.save();
      }

      const book = new Book({ ...args, author });

      return book.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
