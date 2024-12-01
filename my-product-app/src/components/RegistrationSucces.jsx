import React from "react";
import { Typography, Container, Box } from "@mui/material";
const RegistrationSuccess = () => {
  return (
    <div>
      {" "}
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, color: "green" }}>
          <Typography variant="h5" align="center" gutterBottom>
            You have successfully Registered. You can now Login
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            <a href="/login"> Login</a>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default RegistrationSuccess;
