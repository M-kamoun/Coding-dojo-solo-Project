import React from "react";
import { useAuth } from "../components/context/AuthContext";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useState } from "react";
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    const loginData = {
      email,
      password,
    };

    axios
      .post("http://localhost:8081/login", loginData)

      .then((response) => {
        console.log(response.data);
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        const url = "/products";
        login(token, user, url);
      })

      .catch((err) => {
        console.log(err);
        setError("Email or Password is incorrect!");
      });
  };

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
          Login
        </Typography>
        {error && (
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "10px",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              error={!!error?.userName}
              helperText={error.userName}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              error={!!error?.userName}
              helperText={error.userName}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
