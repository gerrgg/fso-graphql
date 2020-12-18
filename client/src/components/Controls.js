import React from "react";
import { Button, Box } from "@material-ui/core";

import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForward";
const Controls = ({ classes, authorCount, start, end, paginate }) => (
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
);

export default Controls;
