import React from "react";
import {
  Box,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const SupplierList = ({
  suppliers,
  pageNumber,
  pageSize,
  handleChangePage,
  handleChangeRowsPerPage,
  totalRecords,
  handleDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (suppliers && suppliers.length > 0) {
      setFilterData(suppliers);
      setLoading(false);
    }
  }, [suppliers]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    setSearchTerm(value);

    if (!value.trim()) {
      setFilterData(suppliers);
      return;
    }

    const filtered = suppliers.filter(
      (suppliers) =>
        suppliers.name.toLowerCase().includes(value) ||
        suppliers.email.toLowerCase().includes(value) ||
        suppliers.address.toLowerCase().includes(value)
    );
    setFilterData(filtered);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        component="fieldset"
        sx={{
          width: "90%",
          maxWidth: "1200px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "15px",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          margin: "20px auto",
        }}
      >
        <legend>
          <Typography variant="h4" color="primary" sx={{ fontWeight: "bold" }}>
            List of Suppliers
          </Typography>
        </legend>
        <TextField
          label="Search"
          placeholder="Search an item..."
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearch}
        ></TextField>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            overflowX: "auto", // Enable horizontal scroll on smaller screens
            marginTop: "25px",
            borderRadius: "8px",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              "@media (max-width: 768px)": {
                minWidth: "auto",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">created At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{supplier.name}</TableCell>
                    <TableCell align="center">{supplier.address}</TableCell>
                    <TableCell align="center">{supplier.email}</TableCell>
                    <TableCell align="center">{supplier.createdAt}</TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          "& button": {
                            margin: "0 5px",
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={`/suppliers/edit/${supplier.id}`}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(supplier.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalRecords || 0}
          page={pageNumber}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
          showFirstButton={true}
          showLastButton={true}
          sx={{
            "& .MuiTablePagination-actions": {
              color: "blue", // Bold font for displayed rows
            },
            "& .MuiTablePagination-displayedRows": {
              fontWeight: "bold", // Bold font for displayed rows
              color: "blue",
            },
            "& .MuiTablePagination-selectLabel": {
              fontWeight: "bold", // Bold font for displayed rows
              color: "blue",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default SupplierList;
