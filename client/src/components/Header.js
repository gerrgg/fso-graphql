import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";

import {
  PersonOutlineRounded,
  BookSharp,
  AddRounded,
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
    float: "right",
  },
}));

export default function ButtonAppBar({ setPage }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md">
            <Typography className={classes.logo} variant="h6">
              Library
            </Typography>
            <IconButton
              className={classes.button}
              edge="end"
              color="inherit"
              onClick={() => setPage("authors")}
            >
              <PersonOutlineRounded />
            </IconButton>
            <IconButton
              className={classes.button}
              edge="end"
              color="inherit"
              onClick={() => setPage("books")}
            >
              <BookSharp />
            </IconButton>
            <IconButton
              className={classes.button}
              edge="end"
              color="inherit"
              onClick={() => setPage("add")}
            >
              <AddRounded />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
