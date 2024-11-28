import React, { useState, useEffect } from "react";
import API_URL from "../../api";
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
  TablePagination,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
const ProductList = ({
  products,
  setProducts,
  categories,
  pageNumber,
  pageSize,
  handleChangePage,
  handleChangeRowsPerPage,
  totalRecords,
  setTotalRecords,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setFilterData(products);

      setLoading(false);
    }
  }, [products]);

  const handleActivation = (id) => {
    console.log("firstActivation");

    API_URL.put(`/products/${id}/product-de-activation`).then((res) => {
      console.log(res.data);
      setProducts(products.filter((product) => product.id !== id));

      setTotalRecords((prevTotal) => prevTotal - 1);
    });
  };

  // handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    setSearchTerm(value);

    if (!value.trim()) {
      setFilterData(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
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
            List of Products
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
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.description}</TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">{product.createdAt}</TableCell>

                    <TableCell
                      align="center"
                      className={
                        categories.find((cat) => cat.id === product.categoryId)
                          ? "upper-case"
                          : "not-assigned"
                      }
                    >
                      {categories.find((cat) => cat.id === product.categoryId)
                        ?.name || "NOT_ASSIGNED"}
                    </TableCell>
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
                          to={`/edit/${product.id}`}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleActivation(product.id)}
                        >
                          DeActivate
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
          count={totalRecords}
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

export default ProductList;
