import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
  // get token from local storage
  const token = localStorage.getItem("library-user-token");

  // add it to request headers for authorization
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

console.log(window.location, process.env);

const API_URI =
  process.env.NODE_ENV === "development"
    ? `http://localhost:4000/api`
    : `${window.location.host}/api`;

const httpLink = new HttpLink({
  uri: API_URI,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
