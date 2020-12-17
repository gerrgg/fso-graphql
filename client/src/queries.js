import { gql } from "@apollo/client";

export const AUTHOR_COUNT = gql`
  query {
    authorCount
  }
`;

export const ALL_AUTHORS = gql`
  query paginate($start: Int, $end: Int) {
    allAuthors(start: $start, end: $end) {
      name
      bookCount
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks(start: 0, end: 10) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const SET_AUTHOR_BORN = gql`
  mutation setAuthorBorn($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;
