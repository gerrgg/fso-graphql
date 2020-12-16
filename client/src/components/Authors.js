import React from "react";

import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
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

const Authors = (props) => {
  const classes = useStyles();
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  const authors = result.loading ? [] : result.data.allAuthors;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={classes.box}
      >
        <Typography className={classes.title} variant="h2">
          Authors
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
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Born</TableCell>
                    <TableCell align="right">Number of Books)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {authors.map((a) => (
                    <TableRow key={a.name}>
                      <TableCell component="th" scope="row">
                        {a.name}
                      </TableCell>
                      <TableCell align="right">{a.born}</TableCell>
                      <TableCell align="right">{a.bookCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <EditAuthor authors={authors} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Authors;
