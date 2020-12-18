import React, { useState } from "react";

import { CssBaseline, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

const useStyles = makeStyles((theme) => ({
  notify: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
      ? localStorage.getItem("library-user-token")
      : null
  );

  const [page, setPage] = useState("books");

  const [errorMessage, setErrorMessage] = useState(null);
  const [severity, setSeverity] = useState(null);

  const notify = (message, severity) => {
    setErrorMessage(message);
    setSeverity(severity);

    setTimeout(() => {
      setErrorMessage(null);
      setSeverity(null);
    }, 5000);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header setPage={setPage} token={token} setToken={setToken} />

      <Container maxWidth="md">
        <Notify errorMessage={errorMessage} severity={severity} />
        {!token ? (
          <LoginForm notify={notify} setToken={setToken} />
        ) : (
          <>
            <Authors show={page === "authors"} notify={notify} />
            <Books show={page === "books"} notify={notify} />
          </>
        )}
      </Container>
    </React.Fragment>
  );
};

const Notify = ({ errorMessage, severity }) => {
  const classes = useStyles();

  severity = severity ? severity : "success";

  if (!errorMessage) {
    return null;
  }
  return (
    <Alert className={classes.notify} severity={severity}>
      {errorMessage}
    </Alert>
  );
};

export default App;
