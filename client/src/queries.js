import { gql } from "@apollo/client";

export const AUTHOR_COUNT = gql`
  query {
    authorCount
  }
`;

export const BOOK_COUNT = gql`
  query {
    bookCount
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
  query paginate($start: Int, $end: Int) {
    allBooks(start: $start, end: $end) {
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
      author {
        name
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
