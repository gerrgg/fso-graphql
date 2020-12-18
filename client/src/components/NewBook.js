import React, { useState } from "react";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    display: "block",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  genreButton: {
    marginLeft: theme.spacing(1),
  },
}));

const NewBook = ({ notify }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message, "error");
    },
    update: (store, response) => {
      console.log(response.data);
      notify(
        `${response.data.addBook.title} by ${response.data.addBook.author.name} added!`
      );
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    if (title && author && published && genres) {
      createBook({ variables: { title, author, published, genres } });
      setTitle("");
      setPublished("");
      setAuhtor("");
      setGenres([]);
      setGenre("");
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  const removeGenre = (genre) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  return (
    <Box className={classes.root} component={Paper}>
      <Typography className={classes.title} variant="h6">
        Add Book
      </Typography>
      <form onSubmit={submit}>
        <FormControl className={classes.formControl}>
          <TextField
            value={title}
            label="Title"
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Author"
            value={author}
            required
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            label="Published"
            type="number"
            value={published}
            required
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </FormControl>

        <Box display="flex" alignItems="center">
          <FormControl className={classes.formControl}>
            <TextField
              label="Genres"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <FormHelperText>
              {genres.map((genre) => (
                <Button
                  key={genre}
                  endIcon={<CloseIcon />}
                  onClick={() => removeGenre(genre)}
                >
                  {genre}
                </Button>
              ))}
            </FormHelperText>
          </FormControl>
          <Button
            className={classes.genreButton}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={addGenre}
          >
            Add Genre
          </Button>
        </Box>

        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            Create Book
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default NewBook;
