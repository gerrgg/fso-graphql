import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, EDIT_USER } from "../queries";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Box,
  TextField,
  FormControl,
  Button,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    maxWidth: 400,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  loading: {
    width: "100%",
  },
}));

const EditUser = ({ notify }) => {
  const classes = useStyles();
  const result = useQuery(GET_USER);
  const user = result.loading ? null : result.data.me;
  const [favoriteGenre, setFavoriteGenre] = useState("");

  useEffect(() => {
    if (user && user.favoriteGenre) {
      console.log(user);
      setFavoriteGenre(user.favoriteGenre);
    }
  }, [user]);

  const [editUser] = useMutation(EDIT_USER, {
    onError: (error) => {
      console.log(error);
      notify(error.graphQLErrors[0].message, "error");
    },
    update: (store, response) => {
      notify("Update successful!");
      return <Redirect to="/" />;
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    if (favoriteGenre) {
      editUser({ variables: { favoriteGenre } });
    }
  };

  return (
    <Box className={classes.root} component={Paper}>
      {result.loading ? (
        <p>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </p>
      ) : (
        <>
          <Typography className={classes.title} variant="h4">
            Edit User
          </Typography>
          <form onSubmit={submit}>
            <Box display="flex" flexDirection="column">
              <FormControl className={classes.formControl}>
                <TextField label="Username" disabled value={user.username} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Favorite Genre"
                  value={favoriteGenre}
                  onChange={({ target }) => setFavoriteGenre(target.value)}
                />
                <FormHelperText>
                  We use this to offer personalized book recommendations.
                </FormHelperText>
              </FormControl>
            </Box>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                startIcon={<CheckCircleIcon />}
                size="large"
              >
                Save Changes
              </Button>
            </FormControl>
          </form>
        </>
      )}
    </Box>
  );
};

export default EditUser;
