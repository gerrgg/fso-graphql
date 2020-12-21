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
  BookRounded,
  ExitToAppRounded,
  FaceRounded,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrapper: {
    textDecoration: "none",
    color: "inherit",
  },
  logo: {
    fontFamily: "'Rock Salt', cursive",
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
      <AppBar position="static">
        <Toolbar>
          <Container className={classes.container} maxWidth="md">
            <Link to="/" className={classes.logoWrapper}>
              <Typography className={classes.logo} variant="h6">
                <span role="img">📚</span> Library <span role="img">📚</span>
              </Typography>
            </Link>
            <div className={classes.wrapper}>
              <Link to="/books" className={classes.menuButton}>
                <IconButton
                  className={classes.button}
                  edge="start"
                  color="inherit"
                >
                  <BookRounded />
                </IconButton>
              </Link>
              <Link to="/authors" className={classes.menuButton}>
                <IconButton className={classes.button} edge="" color="inherit">
                  <PersonOutlineRounded />
                </IconButton>
              </Link>

              {token ? (
                <>
                  <Link to="/user" className={classes.menuButton}>
                    <IconButton
                      edge=""
                      className={classes.button}
                      color="inherit"
                    >
                      <FaceRounded />
                    </IconButton>
                  </Link>
                  <IconButton
                    edge="end"
                    className={classes.button}
                    color="inherit"
                    onClick={() => logout()}
                  >
                    <ExitToAppRounded />
                  </IconButton>
                </>
              ) : null}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
