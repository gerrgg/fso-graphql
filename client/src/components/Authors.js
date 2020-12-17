import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, AUTHOR_COUNT } from "../queries";
import EditAuthor from "./EditAuthor";
import Loading from "./Loading";

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
  Button,
} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
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

const Authors = (props) => {
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

  if (!props.show) {
    return null;
  }

  const authors = result.loading ? [] : result.data.allAuthors;

  const authorCount = authorCountResult.loading
    ? 0
    : authorCountResult.data.authorCount;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.box}
      >
        <Typography className={classes.title} variant="h2">
          {authorCount === 0 ? "Authors" : `${authorCount} Authors`}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Born</TableCell>
                  <TableCell align="right">Number of Books)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.loading ? (
                  <Loading count={10} />
                ) : (
                  authors.map((a) => (
                    <TableRow key={a.name}>
                      <TableCell component="th" scope="row">
                        {a.name}
                      </TableCell>
                      <TableCell align="right">{a.born}</TableCell>
                      <TableCell align="right">{a.bookCount}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.box} display="flex">
            <Button
              color="primary"
              disabled={start === 0}
              startIcon={<ArrowBackIosRoundedIcon />}
              onClick={() => paginate("prev")}
            >
              Prev
            </Button>
            <Button>
              {authorCount === 0
                ? "Loading results"
                : `${start}-${end} of ${authorCount} Results`}
            </Button>
            <Button
              color="primary"
              disabled={end > authorCount}
              endIcon={<ArrowForwardIosRoundedIcon />}
              onClick={() => paginate("next")}
            >
              Next
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <EditAuthor authors={authors} start={start} end={end} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Authors;
