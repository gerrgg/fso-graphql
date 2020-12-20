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
}));

const Books = ({ show, notify }) => {
  const classes = useStyles();
  const [start, setStart] = useState(0);
  const [perPage] = useState(10);
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

  if (!show) {
    return null;
  }

  const books = result.loading ? [] : result.data.allBooks;

  const bookCount = bookCountResult.loading
    ? 0
    : bookCountResult.data.bookCount;

  return (
    <div>
      <Typography className={classes.title} variant="h2">
        {bookCount === 0 ? "Books" : `${bookCount} Books`}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <TableContainer component={Paper}>
            <Controls
              classes={classes}
              authorCount={bookCount}
              start={start}
              end={end}
              paginate={paginate}
            />
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
                  books.map((b) => (
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
        <Grid item xs={12} sm={5}>
          <NewBook notify={notify} start={start} end={end} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Books;
