import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITableColumn } from "../../models/table";
import { Button, useTheme } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import { Add, Delete } from "@mui/icons-material";

export default function GFTable({
  columns,
  data,
}: {
  columns: ITableColumn[];
  data: Record<string, any>[];
}) {
  const theme = useTheme();
  const main = theme.palette.primary.main;
  const textColor = theme.palette.primary.contrastText;
  const light = theme.palette.primary.light;

  const getVariant = (index: number) => {
    switch (index) {
      case 0:
        return "contained";
      case 1:
        return "outlined";
      case 2:
        return "text";
      default:
        return "text";
    }
  };

  const getEndIcon = (actionType: string) => {
    switch (actionType) {
      case "EDIT":
        return <Edit />;
      case "DELETE":
        return <Delete />;
      case "ADD":
        return <Add />;
      default:
        return <Add />;
    }
  };

  const getTableData = (column: ITableColumn, row:  any, index: number) => {
    if (column.type === "action") {
      if (column.actions) {
        return column.actions.map((action: any, index: number) => {
          return (
            <Button
              sx={{ marginRight: "10px" }}
              onClick={() => action.handler(row)}
              variant={getVariant(index)}
              endIcon={getEndIcon(action.actionType)}
            >
              {action.actionType}
            </Button>
          );
        });
      }
    } else if (column.id === "id") {
      return index + 1;
    } else {
      return row[column.id];
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#B2860D" }}>
            <TableRow>
              {columns.map((item) => (
                <TableCell
                  key={item.name}
                  align="center"
                  sx={{ fontWeight: 600, fontSize: 18, color: textColor }}
                >
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`} align="center">
                    {getTableData(column, row, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
