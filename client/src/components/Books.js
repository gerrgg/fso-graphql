import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Controls from "./Controls";
import Loading from "./Loading";
import { ALL_BOOKS } from "../queries";
import NewBook from "../components/NewBook";
import { makeStyles } from "@material-ui/core/styles";
import {
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
import ClearIcon from "@material-ui/icons/Clear";
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
}));

const Books = ({ notify }) => {
  const classes = useStyles();
  const [start, setStart] = useState(0);
  const [perPage] = useState(10);
  const [end, setEnd] = useState(perPage);
  const [filter, setFilter] = useState("");
  const result = useQuery(ALL_BOOKS);

  const paginate = (direction) => {
    if (direction === "prev") {
      setStart(start - perPage);
      setEnd(end - perPage);
    } else if (direction === "next") {
      setStart(start + perPage);
      setEnd(end + perPage);
    }
  };

  let books = result.loading ? [] : result.data.allBooks;

  if (filter) {
    books = books.filter((b) => b.genres.includes(filter));
  }

  return (
    <div>
      <Typography className={classes.title} variant="h2">
        {books.length === 0
          ? "Books"
          : `${books.length} books ${filter ? ` in "${filter}"` : ""}`}
      </Typography>

      <GenreFilter classes={classes} setFilter={setFilter} filter={filter} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <TableContainer component={Paper}>
            <Controls
              classes={classes}
              authorCount={books.length}
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
                  books.slice(start, end).map((b) => (
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

const GenreFilter = ({ setFilter, filter, classes }) => {
  const handleClick = (genre) => {
    setFilter(genre.toLowerCase());
  };

  const genres = [
    "Crime",
    "Horror",
    "Teen",
    "Database",
    "Classic",
    "Refactoring",
  ];

  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      className={classes.filter}
    >
      {genres.map((g) => (
        <Button
          variant={g.toLowerCase() === filter ? "contained" : null}
          onClick={({ target }) => handleClick(target.textContent)}
        >
          {g}
        </Button>
      ))}
      <Button
        variant="contained"
        color="secondary"
        disabled={filter === ""}
        endIcon={<ClearIcon />}
        onClick={() => setFilter("")}
      >
        Clear
      </Button>
    </ButtonGroup>
  );
};

export default Books;
