import React from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
export const CategoryForm = ({
  CategorySelected,
  titleLabel,
  buttonLabel,
  OnSubmitProp,
  errors,
}) => {
  const [categories, setCategories] = useState(CategorySelected);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategories({ ...categories, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    OnSubmitProp(categories);
    setCategories({ name: "" }); // Reset form
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
                error={!!errors.message}
                helperText={errors.message}
                name="name"
                variant="outlined"
                onChange={handleChange}
                value={categories.name}
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
