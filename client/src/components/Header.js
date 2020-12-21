import React from "react";
import { Link, Route } from "react-router-dom";
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
  logoWrapper: {
    textDecoration: "none",
    color: "inherit",
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
  menuButton: {
    color: "inherit",
  },
}));

export default function Header({ token, setToken }) {
  const classes = useStyles();
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div className={classes.root}>
      <AppBar position="stati0c">
        <Toolbar>
          <Container maxWidth="md">
            <Link to="/" className={classes.logoWrapper}>
              <Typography className={classes.logo} variant="h6">
                Library
              </Typography>
            </Link>
            <div className={classes.wrapper}>
              <Link to="/books" className={classes.menuButton}>
                <IconButton className={classes.button} color="inherit">
                  <BookSharp />
                </IconButton>
              </Link>
              <Link to="/authors" className={classes.menuButton}>
                <IconButton
                  className={classes.button}
                  edge="start"
                  color="inherit"
                >
                  <PersonOutlineRounded />
                </IconButton>
              </Link>

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
