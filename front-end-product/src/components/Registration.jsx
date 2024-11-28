import React from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Paper,
  TextField,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useState } from "react";
const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        <Typography variant="h5" align="center">
          Register
        </Typography>
        <form>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField label="Username" fullWidth />
          </Box>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField label="Email" fullWidth />
          </Box>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField label="Password" type="password" fullWidth />
          </Box>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField label="Confirm Password" type="password" fullWidth />
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default Registration;
