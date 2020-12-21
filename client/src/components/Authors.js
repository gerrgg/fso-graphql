import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import EditAuthor from "./EditAuthor";
import Loading from "./Loading";
import Controls from "./Controls";
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
    width: "33%",
  },
}));

const Authors = ({ show, notify }) => {
  const classes = useStyles();
  const [start, setStart] = useState(0);
  const [perPage] = useState(10);
  const [end, setEnd] = useState(perPage);

  const result = useQuery(ALL_AUTHORS);

  const paginate = (direction) => {
    if (direction === "prev") {
      setStart(start - perPage);
      setEnd(end - perPage);
    } else if (direction === "next") {
      setStart(start + perPage);
      setEnd(end + perPage);
    }
  };

  const authors = result.loading ? [] : result.data.allAuthors;

  return (
    <div>
      <Typography className={classes.title} variant="h2">
        {authors.length === 0 ? "Authors" : `${authors.length} Authors`}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <Controls
            classes={classes}
            authorCount={authors.length}
            start={start}
            end={end}
            paginate={paginate}
          />
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>Name</TableCell>
                  <TableCell className={classes.cell} align="right">
                    Born
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Number of Books
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.loading ? (
                  <Loading rows={10} columns={3} />
                ) : (
                  authors.slice(start, end).map((a) => (
                    <TableRow key={a.name}>
                      <TableCell
                        className={classes.cell}
                        component="th"
                        scope="row"
                      >
                        {a.name}
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        {a.born}
                      </TableCell>
                      <TableCell className={classes.cell} align="right">
                        {a.bookCount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={5}>
          <EditAuthor
            authors={authors}
            start={start}
            end={end}
            notify={notify}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Authors;
