import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
const ProductForm = ({
  categories,
  OnSubmitProp,
  productSelected,
  errors,
  titleLabel,
  buttonLabel,
}) => {
  const [products, setProducts] = useState(productSelected);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };
  console.log(productSelected);
  console.log(products);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(products);

    const formatData = {
      name: products.name,
      description: products.description,
      price: parseFloat(products.price),
      category: products.categoryId
        ? { id: parseInt(products.categoryId) }
        : null,
    };

    OnSubmitProp(formatData);
    setProducts({ name: "", description: "", price: 0.0, categoryId: "" }); // Reset form
  };
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
            {titleLabel}
          </Typography>
        </legend>
        <Box
          component="form"
          onSubmit={onSubmitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "900px",
            margin: "5px auto",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              gap: 2,
              margin: "5px auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                variant="form"
                sx={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}
              >
                Product name:
              </Typography>
              <TextField
                error={!!errors.name}
                helperText={errors.name}
                name="name"
                variant="outlined"
                onChange={handleChange}
                value={products.name}
                sx={{ flex: 1, width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                variant="form"
                sx={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}
              >
                Description
              </Typography>
              <TextField
                error={!!errors.description}
                helperText={errors.description}
                name="description"
                variant="outlined"
                value={products.description}
                onChange={handleChange}
                sx={{ flex: 1, width: "100%" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              gap: 2,
              margin: "5px auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                variant="form"
                sx={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}
              >
                Price
              </Typography>
              <TextField
                error={!!errors.price}
                helperText={errors.price}
                name="price"
                type="Number"
                variant="outlined"
                value={products.price}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                variant="form"
                sx={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}
              >
                Add Category
              </Typography>
              <FormControl fullWidth variant="outlined">
                <Select
                  labelId="select-label"
                  id="select-label"
                  name="categoryId"
                  value={products.categoryId || ""}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>--- Select a Category---</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              gap: 2,
              "& button": {
                margin: "5px 5px",
              },
            }}
          >
            <Button
              sx={{
                marginBottom: "16px",
                padding: "10px 20px",
                fontSize: "16px",
              }}
              variant="contained"
              color="secondary"
              onClick={() =>
                setProducts({
                  name: "",
                  description: "",
                  price: 0.0,
                  categoryId: "",
                })
              }
            >
              Reset
            </Button>
            <Button
              sx={{
                marginBottom: "16px",
                padding: "10px 20px",
                fontSize: "16px",

                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProductForm;
