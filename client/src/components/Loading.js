import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { TableRow, TableCell } from "@material-ui/core";

const Loading = ({ rows, columns }) => {
  return [...Array(rows)].map((_, i) => (
    <TableRow key={i}>
      {[...Array(columns)].map((_, z) => (
        <TableCell key={z}>
          <Skeleton></Skeleton>
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default Loading;
