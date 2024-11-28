import React from "react";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";

const OrderForm = ({
  OnSubmitProp,
  suppliers,
  products,
  errors,
  titleLabel,
  buttonLabel,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orderLines, setOrderLines] = useState([
    { productId: "", quantity: 1 },
  ]);
  const [orderDetails, setOrderDetails] = useState({
    code: "",
    orderDate: "",
  });

  const handleAddProduct = () => {
    setOrderLines((prev) => [...prev, { productId: "", quantity: 1 }]);
    console.log(orderLines);
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
    console.log("order Submitted");
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
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Order Code
                </Typography>
                <TextField
                  type="number"
                  label="Order Code"
                  value={orderDetails.code}
                  onChange={(e) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "#fff" }}
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
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Order Date
                </Typography>
                <TextField
                  type="Date"
                  value={orderDetails.date}
                  onChange={(e) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "#fff" }}
                />
              </Box>
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
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Product Name
                </Typography>
                <TextField
                  type="number"
                  label="Order Code"
                  value={orderDetails.code}
                  onChange={(e) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "#fff" }}
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
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Quantity
                </Typography>
                <TextField
                  type="Date"
                  value={orderDetails.date}
                  onChange={(e) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "#fff" }}
                />
              </Box>
              <Box>
                <h1>test</h1>
              </Box>
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
            <Button>add</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrderForm;
