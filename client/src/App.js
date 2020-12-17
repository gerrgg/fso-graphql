import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Header from "./components/Header";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <React.Fragment>
      <CssBaseline />
      <Header setPage={setPage} />

      <Container maxWidth="md">
        <Authors show={page === "authors"} />

        <Books show={page === "books"} />
      </Container>
    </React.Fragment>
  );
};

export default App;
