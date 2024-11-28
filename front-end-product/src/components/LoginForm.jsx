import React from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
const LoginForm = () => {
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
        <form>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField label="Username or Email" fullWidth />
          </Box>
          <Box mb={2} border={1} borderColor="grey.400" borderRadius={2} p={2}>
            <TextField label="Password" type="password" fullWidth />
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
