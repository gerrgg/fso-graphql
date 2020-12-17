import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

const Loading = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={8}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Skeleton variant="rect" height={300} />
    </Grid>
  </Grid>
);

export default Loading;
