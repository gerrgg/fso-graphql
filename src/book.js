module.exports = `
  type Book {
    title: String!
    author: Author
    published: String!
    genres: [String]!
    id: ID!
  }`;
