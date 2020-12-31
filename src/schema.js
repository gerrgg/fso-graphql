const { makeExecutableSchema } = require("@graphql-tools/schema");
const resolvers = require("./resolvers");

const Book = require("./book");
const Author = require("./author");
const User = require("./user");
const Token = require("./token");

const Query = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(start: Int, end: Int, author: String, genre: String): [Book!]
    allAuthors(start: Int, end: Int): [Author!]!
    allUsers: [User!]
    findAuthor(name: String!): Author
    me: User
  }
`;

const Mutation = `
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!

    addAuthor(name: String!, bookCount: Int!, born: Int): Author!

    editAuthor(name: String!, born: Int!): Author!

    editUser(favoriteGenre: String!): User!

    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }`;

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Author, Book, User, Token],
  resolvers,
});

module.exports = schema;
