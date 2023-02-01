import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "pu_id", label: "Polling Unit ID", minWidth: 170 },
  { id: "pu_name", label: "Polling Unit Name", minWidth: 100 },
  { id: "pu_code", label: "PU Code", minWidth: 100 },
];

export default function DataTable({ rows, state, lga, ward }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const navigate = useNavigate();
  const rowHanddle = (name) => {
    navigate("/data", { state: { sta: state, lga: lga, ward: ward, pu: name } });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}>
      <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ color: "primary.main", fontWeight: "800" }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Images</TableCell>
              <TableCell>Videos</TableCell>
              <TableCell>Click To View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.pu_code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell sx={{ color: "primary.main", fontWeight: "400", cursor: "pointer" }} key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>20/2000</TableCell>
                  <TableCell>20/2000</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => rowHanddle(row.pu_name)}>
                      Click me
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
