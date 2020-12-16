import React from "react";
import Loading from "./Loading";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: `${theme.spacing(2)}px 0`,
  },
  box: {
    justifyContent: "space-between",
  },
}));

const Books = (props) => {
  const classes = useStyles();
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  const books = result.loading ? [] : result.data.allBooks;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.box}
      >
        <Typography className={classes.title} variant="h2">
          Books
        </Typography>
      </Box>

      {result.loading ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Author</TableCell>
                    <TableCell align="right">Published</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((b) => (
                    <TableRow key={b.title}>
                      <TableCell component="th" scope="row">
                        {b.title}
                      </TableCell>
                      <TableCell align="right">{`${
                        b.author ? b.author.name : "Anonymous"
                      }`}</TableCell>
                      <TableCell align="right">{b.published}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography className={classes.title} variant="h6">
                Add Book
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Books;
