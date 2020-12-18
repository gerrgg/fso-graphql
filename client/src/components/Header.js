import React from "react";
import { useApolloClient } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";

import {
  PersonOutlineRounded,
  BookSharp,
  ExitToAppRounded,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    display: "inline",
    marginRight: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  wrapper: {
    float: "right",
  },
}));

export default function Header({ setPage, token, setToken }) {
  const classes = useStyles();
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md">
            <Typography className={classes.logo} variant="h6">
              Library
            </Typography>
            <div className={classes.wrapper}>
              <IconButton
                className={classes.button}
                edge="start"
                color="inherit"
                onClick={() => setPage("authors")}
              >
                <PersonOutlineRounded />
              </IconButton>
              <IconButton
                className={classes.button}
                color="inherit"
                onClick={() => setPage("books")}
              >
                <BookSharp />
              </IconButton>
              {token ? (
                <IconButton
                  className={classes.button}
                  color="inherit"
                  onClick={() => logout()}
                >
                  <ExitToAppRounded />
                </IconButton>
              ) : null}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
