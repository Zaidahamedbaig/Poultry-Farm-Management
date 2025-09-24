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

  const getTableData = (column: ITableColumn, row: any, index: number) => {
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
    } else if (column.id === "dateOfBirth" || column.id === "dateOfPurchase" || column.id ==="date") {
      const formattedDate = new Date(row[column.id]).toLocaleDateString(
        "en-IN"
      );
      return formattedDate;
    } else if (column.id === "mortality") {
      let totalDeaths = 0;
      if (row[column.id].length !== 0) {
        row[column.id].forEach((element: any) => {
          totalDeaths += element.quantity;
        });
        const mortality = row["quantity"] - totalDeaths;
        if (mortality > 0) {
          return mortality;
        } else {
          return "All Dead";
        }
      } else {
        return "No Deaths";
      }
    } else if (column.id === "status") {
      if (row[column.id] === 1) {
        return <p style={{ color: "#6ee533ff" }}>Active</p>;
      } else {
        return <p style={{ color: "#f42424ff" }}>Inactive</p>;
      }
    } else {
      return row[column.id];
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#f8ebc6ff" }}>
            <TableRow>
              {columns.map((item) => (
                <TableCell
                  key={item.name}
                  align="center"
                  sx={{ fontWeight: 600, fontSize: 18, color: "#B2860D " }}
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
