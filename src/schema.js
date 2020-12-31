const { gql } = require("apollo-server");

// Schema
const schema = gql`
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

    editAuthor(name: String!, born: Int!): Author!

    editUser(favoriteGenre: String!): User!

    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`;

module.exports = schema;
