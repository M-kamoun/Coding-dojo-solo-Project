import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderForm = ({
  OnSubmitProp,
  suppliers,
  products,
  errors,
  titleLabel,
  buttonLabel,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [orderLines, setOrderLines] = useState([
    { productId: "", quantity: 1 },
  ]);
  const [orderDetails, setOrderDetails] = useState({
    code: "",
    orderDate: "",
  });

  const handleAddProduct = () => {
    setOrderLines((prev) => [...prev, { productId: "", quantity: 1 }]);
  };

  const handleRemoveProduct = (index) => {
    setOrderLines(orderLines.filter((_, i) => i !== index));
  };

  const handleUpdateLine = (index, field, value) => {
    setOrderLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...orderDetails,
      supplierId: selectedSupplier,
      orderLines,
    };
    OnSubmitProp(orderData); // Pass data to the parent component
  };

  return (
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
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          padding: "16px",
        }}
      >
        {/* Order Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            marginBottom: "16px",
            width: "100%",
          }}
        >
          <TextField
            label="Order Code"
            value={orderDetails.code}
            onChange={(e) =>
              setOrderDetails((prev) => ({ ...prev, code: e.target.value }))
            }
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Order Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={orderDetails.orderDate}
            onChange={(e) =>
              setOrderDetails((prev) => ({
                ...prev,
                orderDate: e.target.value,
              }))
            }
            fullWidth
            variant="outlined"
          />
        </Box>

        {/* Supplier Selection */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <Typography
            variant="form"
            sx={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}
          >
            Supplier
          </Typography>
          <Select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Supplier
            </MenuItem>
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Order Lines */}
        {orderLines.map((line, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Select
              value={line.productId}
              onChange={(e) =>
                handleUpdateLine(index, "productId", e.target.value)
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Product
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              type="number"
              label="Quantity"
              value={line.quantity}
              onChange={(e) =>
                handleUpdateLine(index, "quantity", e.target.value)
              }
              fullWidth
              variant="outlined"
              Props={{ inputProps: { min: 1 } }}
            />
            <IconButton onClick={() => handleRemoveProduct(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        ))}

        {/* Add Product Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginTop: "16px" }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default OrderForm;
