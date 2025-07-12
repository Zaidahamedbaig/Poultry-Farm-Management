import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITableColumn } from "../../models/table";

function createData(id: number, name: string, address: string, phone: number) {
  return { name, id, address, phone };
}

const rows = [
  createData(1, "zaid", "umar circle", 973172564),
  createData(2, "Javeed", "umar circle", 9008775929),
];

export default function GFTable({
  columns,
  data,
}: {
  columns: ITableColumn[];
  data: Record<string, any>[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell align="center" sx={{ fontWeight: 900 }}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell align="center">{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
