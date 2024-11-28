import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

const SupplierForm = ({
  OnSubmitProp,
  supplierSelected,
  errors,
  titleLabel,
  buttonLabel,
}) => {
  const [suppliers, setSuppliers] = useState(supplierSelected);

  useEffect(() => {
    setSuppliers(supplierSelected); // Reset form when component mounts and supplierSelected prop changes
  }, [supplierSelected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuppliers({ ...suppliers, [name]: value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(suppliers);

    const formatData = {
      name: suppliers.name,
      address: suppliers.address,
      email: suppliers.email,
    };

    OnSubmitProp(formatData);

    setSuppliers({ name: "", address: "", email: "" }); // Reset form
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
                value={suppliers.name}
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
                Address
              </Typography>
              <TextField
                error={!!errors.address}
                helperText={errors.address}
                name="address"
                variant="outlined"
                value={suppliers.address}
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
                Email
              </Typography>
              <TextField
                error={!!errors.email}
                helperText={errors.email || ""}
                name="email"
                type="email"
                variant="outlined"
                value={suppliers.email}
                onChange={handleChange}
              />
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

export default SupplierForm;
