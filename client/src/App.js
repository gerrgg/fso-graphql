import React, { useState } from "react";

import { CssBaseline, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Header from "./components/Header";

const useStyles = makeStyles((theme) => ({
  notify: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header setPage={setPage} />

      <Container maxWidth="md">
        <Notify errorMessage={errorMessage} />
        <Authors show={page === "authors"} notify={notify} />

        <Books show={page === "books"} notify={notify} />
      </Container>
    </React.Fragment>
  );
};

const Notify = ({ errorMessage }) => {
  const classes = useStyles();

  if (!errorMessage) {
    return null;
  }
  return (
    <Alert className={classes.notify} severity="error">
      {errorMessage}
    </Alert>
  );
};

export default App;
