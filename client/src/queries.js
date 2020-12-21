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
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
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

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($favoriteGenre: String!) {
    editUser(favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre
    }
  }
`;

export const RECOMMENDATIONS = gql`
  query recommendations($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      genres
      published
    }
  }
`;
