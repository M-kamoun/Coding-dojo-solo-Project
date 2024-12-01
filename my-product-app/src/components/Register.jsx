import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api";
import { Typography, Button, Box, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to server for registration

    axiosInstance
      .post("http://localhost:8081/register", formData)
      .then((response) => {
        console.log(formData);
        console.log(response);
        navigate("/register-success");
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data; // get errors from response

        setError(errorResponse);
      });
  };
  useEffect(() => {
    console.log("Updated errors: ", error);
  }, [error]); //
  return (
    <div>
      {" "}
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
          <form onSubmit={handleSubmit}>
            <Box
              mb={2}
              border={1}
              borderColor="grey.400"
              borderRadius={2}
              p={2}
            >
              <TextField
                label="Username"
                name="userName"
                error={!!error?.userName}
                helperText={error.userName}
                fullWidth
                value={formData.userName}
                onChange={handleChange}
              />
            </Box>
            <Box
              mb={2}
              border={1}
              borderColor="grey.400"
              borderRadius={2}
              p={2}
            >
              <TextField
                error={!!error.email}
                helperText={error.email}
                label="Email"
                fullWidth
                onChange={handleChange}
                name="email"
                value={formData.email}
              />
            </Box>
            <Box
              mb={2}
              border={1}
              borderColor="grey.400"
              borderRadius={2}
              p={2}
            >
              <TextField
                name="password"
                error={!!error?.password}
                helperText={error.password}
                label="Password"
                type="password"
                fullWidth
                onChange={handleChange}
                value={formData.password}
              />
            </Box>
            <Box
              mb={2}
              border={1}
              borderColor="grey.400"
              borderRadius={2}
              p={2}
            >
              <TextField
                error={!!error?.confirm}
                helperText={error.confirm}
                label="Confirm Password"
                type="password"
                fullWidth
                name="confirm"
                onChange={handleChange}
                value={formData.confirm}
              />
            </Box>
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Register;
