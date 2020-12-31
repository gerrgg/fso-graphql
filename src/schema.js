const { merge } = require("lodash");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { typeDef: Book, resolvers: bookResolvers } = require("./book");
const { typeDef: Author, resolvers: authorResolvers } = require("./author");
const { typeDef: User, resolvers: userResolvers } = require("./user");
const resolvers = require("./resolvers");

const Token = `
  type Token {
    value: String!
  }`;

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
  resolvers: merge(resolvers, bookResolvers, authorResolvers, userResolvers),
});

module.exports = schema;
