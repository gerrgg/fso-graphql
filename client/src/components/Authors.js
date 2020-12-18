import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, AUTHOR_COUNT } from "../queries";
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
  Box,
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
  const [perPage, setPerPage] = useState(10);
  const [end, setEnd] = useState(perPage);

  const authorCountResult = useQuery(AUTHOR_COUNT);

  const result = useQuery(ALL_AUTHORS, {
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

  const authors = result.loading ? [] : result.data.allAuthors;

  const authorCount = authorCountResult.loading
    ? 0
    : authorCountResult.data.authorCount;

  return (
    <div>
      <Typography className={classes.title} variant="h2">
        {authorCount === 0 ? "Authors" : `${authorCount} Authors`}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <TableContainer component={Paper}>
            <Controls
              classes={classes}
              authorCount={authorCount}
              start={start}
              end={end}
              paginate={paginate}
            />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>Name</TableCell>
                  <TableCell className={classes.cell} align="right">
                    Born
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    Number of Books)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.loading ? (
                  <Loading count={perPage} />
                ) : (
                  authors.map((a) => (
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
