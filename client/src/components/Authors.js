import React from "react";
import Loading from "./Loading";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditAuthor from "./EditAuthor";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  const authors = result.loading ? [] : result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      {result.loading ? <Loading /> : <AuthorTable authors={authors} />}
      <EditAuthor authors={authors} />
    </div>
  );
};

const AuthorTable = ({ authors }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>born</th>
        <th>books</th>
      </tr>
      {authors.map((a) => (
        <tr key={a.name}>
          <td>{a.name}</td>
          <td>{a.born}</td>
          <td>{a.bookCount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Authors;
