import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { TableRow, TableCell } from "@material-ui/core";

const Loading = ({ rows, columns }) => {
  return [...Array(rows)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(columns)].map((_, index) => (
        <TableCell align="right">
          <Skeleton></Skeleton>
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default Loading;
