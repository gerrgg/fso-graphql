import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Controls from "./Controls";
import Loading from "./Loading";
import { ALL_BOOKS, BOOK_COUNT } from "../queries";
import NewBook from "../components/NewBook";
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
    marginTop: theme.spacing(2),
  },
}));

const Books = (props) => {
  const classes = useStyles();
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [end, setEnd] = useState(perPage);

  const bookCountResult = useQuery(BOOK_COUNT);

  const result = useQuery(ALL_BOOKS, {
    variables: { start, end },
  });

  const paginate = (direction) => {
    if (direction === "prev") {
      setStart(start - perPage);
      setEnd(end - perPage);
    } else if (direction === "next") {
      setStart(start + perPage);
      setEnd(end + perPage);
    }
  };

  if (!props.show) {
    return null;
  }

  const books = result.loading ? [] : result.data.allBooks;

  const bookCount = bookCountResult.loading
    ? 0
    : bookCountResult.data.bookCount;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.box}
      >
        <Typography className={classes.title} variant="h2">
          {bookCount === 0 ? "Books" : `${bookCount} Books`}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <Controls
            classes={classes}
            authorCount={bookCount}
            start={start}
            end={end}
            paginate={paginate}
          />
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
                {result.loading ? (
                  <Loading count={10} />
                ) : (
                  books.map((b) => (
                    <TableRow key={b.title}>
                      <TableCell component="th" scope="row">
                        {b.title}
                      </TableCell>
                      <TableCell align="right">{`${
                        b.author ? b.author.name : "Anonymous"
                      }`}</TableCell>
                      <TableCell align="right">{b.published}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={5}>
          <NewBook />
        </Grid>
      </Grid>
    </div>
  );
};

export default Books;
