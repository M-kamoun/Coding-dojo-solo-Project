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
} from "@mui/material";
import { Link } from "react-router-dom";
const CategoriesList = ({ categories, handleDelete }) => {
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
            List of Categories
          </Typography>
        </legend>
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
                <TableCell align="center">id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{category.id}</TableCell>
                  <TableCell align="center">{category.name}</TableCell>

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
                        to={`/categories/edit/${category.id}`}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CategoriesList;
