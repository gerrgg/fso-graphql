import React from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  const books = result.loading ? [] : result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      {result.loading ? <p>Loading...</p> : <Table books={books} />}
    </div>
  );
};

const Table = ({ books }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
      </tr>
      {books.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{`${a.author ? a.author.name : "Anon"}`}</td>
          <td>{a.published}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Books;
