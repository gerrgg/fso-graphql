import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { TableRow, TableCell } from "@material-ui/core";

const Loading = ({ count }) => {
  return [...Array(count)].map((_, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell align="right">
        <Skeleton></Skeleton>
      </TableCell>
      <TableCell align="right">
        <Skeleton></Skeleton>
      </TableCell>
    </TableRow>
  ));
};

export default Loading;
