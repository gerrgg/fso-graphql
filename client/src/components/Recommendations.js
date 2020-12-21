import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { RECOMMENDATIONS } from "../queries";
import Controls from "./Controls";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ButtonGroup,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: `${theme.spacing(4)}px 0`,
  },
  box: {
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  cell: {
    width: "25%",
  },
  filter: {
    margin: `${theme.spacing(2)}px auto`,
  },
  buttonControl: {
    justifyContent: "space-between",
    margin: `${theme.spacing(2)}px 0`,
  },
}));

const Recommendations = ({ user, notify }) => {
  const classes = useStyles();

  const result = useQuery(RECOMMENDATIONS, {
    variables: { genre: user ? user.favoriteGenre : "" },
  });

  const recommendations = result.loading ? [] : result.data.allBooks;

  return (
    <div>
      <Typography className={classes.title} variant="h3">
        {recommendations.length === 0
          ? "Recommendations"
          : `${recommendations.length} recommended books ${
              user ? ` in "${user.favoriteGenre}"` : ""
            }`}
      </Typography>

      <Box display="flex" alignItems="center" className={classes.buttonControl}>
        <Link to="/user">
          <Button>Change favorite genre</Button>
        </Link>

        <Link to="/">
          <Button variant="contained" color="primary">
            All Books
          </Button>
        </Link>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>Title</TableCell>
                  <TableCell className={classes.cell} align="right">
                    Author
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Genres
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Published
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.loading ? (
                  <Loading rows={10} columns={4} />
                ) : (
                  recommendations.map((b) => (
                    <TableRow key={b.title}>
                      <TableCell
                        className={classes.cell}
                        component="th"
                        scope="row"
                      >
                        {b.title}
                      </TableCell>
                      <TableCell className={classes.cell} align="right">{`${
                        b.author ? b.author.name : "Anonymous"
                      }`}</TableCell>
                      <TableCell className={classes.cell} align="right">
                        {b.genres.join(", ")}
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        {b.published}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Recommendations;
