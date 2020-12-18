import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_AUTHOR_BORN, ALL_AUTHORS } from "../queries";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditAuthor = ({ authors, start, end, notify }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS, variables: { start, end } }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    setAuthorBorn({ variables: { name, born } });
    setName("");
    setBorn("");
  };

  return (
    <Box className={classes.root} component={Paper}>
      <Typography className={classes.title} variant="h6">
        Edit Author
      </Typography>
      <form onSubmit={submit}>
        <Box display="flex" flexDirection="column">
          <FormControl className={classes.formControl}>
            <InputLabel>Name</InputLabel>
            <Select
              value={name}
              required
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((author, i) => (
                <MenuItem key={i} value={author.name}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              type="number"
              label="Born"
              value={born}
              required
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </FormControl>
        </Box>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            size="medium"
          >
            Set birth year
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default EditAuthor;
