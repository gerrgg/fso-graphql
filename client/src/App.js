import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  // get token or set to null
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
      ? localStorage.getItem("library-user-token")
      : null
  );

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
    <Router>
      <CssBaseline />
      <Header token={token} setToken={setToken} />
      <Container maxWidth="md">
        <Notify errorMessage={errorMessage} severity={severity} />
        {!token ? (
          <LoginForm notify={notify} setToken={setToken} />
        ) : (
          <Switch>
            <Route path="/authors">
              <Authors notify={notify} />
            </Route>
            <Route exact path="/">
              {!token ? (
                <LoginForm notify={notify} setToken={setToken} />
              ) : (
                <Books notify={notify} />
              )}
            </Route>
          </Switch>
        )}
      </Container>
    </Router>
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
