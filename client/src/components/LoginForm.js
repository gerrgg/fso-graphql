import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LoginForm = ({ notify, setToken }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("greg");
  const [password, setPassword] = useState("secred");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message, "error");
    },
    update: (store, response) => {
      notify("Login successful!");
      setUsername("");
      setPassword("");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <Box className={classes.root} component={Paper}>
      <Typography className={classes.title} variant="h2">
        Login
      </Typography>
      <form onSubmit={submit}>
        <Box display="flex" flexDirection="column">
          <FormControl className={classes.formControl}>
            <TextField
              label="Username"
              value={username}
              required
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              type="password"
              label="Password"
              value={password}
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormControl>
        </Box>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            size="large"
          >
            Login
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginForm;
