import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SET_AUTHOR_BORN, ALL_AUTHORS } from "../queries";

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(2020);

  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    setAuthorBorn({ variables: { name, born } });

    setName("");
    setBorn(2020);
  };

  return (
    <div>
      <h3>Edit Author</h3>
      <form onSubmit={submit}>
        <Dropdown authors={authors} setName={setName} name={name} />
        <div>
          Born:
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">Set birth year</button>
      </form>
    </div>
  );
};

const Dropdown = ({ authors, setName, name }) => (
  <div>
    Author:
    <select value={name} onChange={({ target }) => setName(target.value)}>
      {authors.map((author, i) => (
        <option key={i} value={author.name}>
          {author.name}
        </option>
      ))}
    </select>
  </div>
);

export default EditAuthor;
