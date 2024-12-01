import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const NavBar = () => {
  const { logout, isAuthenticated } = useAuth();

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Home sx={{ marginRight: 1, fontSize: 35, color: "yellow" }} />
                Welcome to Fix-It Corner
                <Typography
                  variant="h4"
                  color="yellow"
                  sx={{ textTransform: "uppercase" }}
                >
                  {isAuthenticated && JSON.parse(localStorage.getItem("user"))}
                </Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              {isAuthenticated && (
                <>
                  <Button
                    sx={{
                      color: isActive("/") ? "yellow" : "white",
                      fontWeight: isActive("/") ? "bold" : "normal",
                      borderBottom: isActive("/") ? "2px solid yellow" : "none",
                    }}
                    component={Link}
                    to="/products"
                  >
                    Products
                  </Button>
                  <Button
                    sx={{
                      color: isActive("/categories") ? "yellow" : "white",
                      fontWeight: isActive("/categories") ? "bold" : "normal",
                      borderBottom: isActive("/categories")
                        ? "2px solid yellow"
                        : "none",
                    }}
                    component={Link}
                    to="/categories"
                  >
                    Categories
                  </Button>
                  <Button
                    sx={{
                      color: isActive("/suppliers") ? "yellow" : "white",
                      fontWeight: isActive("/suppliers") ? "bold" : "normal",
                      borderBottom: isActive("/suppliers")
                        ? "2px solid yellow"
                        : "none",
                    }}
                    component={Link}
                    to="/suppliers"
                  >
                    Suppliers
                  </Button>
                  <Button
                    sx={{
                      color: isActive("/orders") ? "yellow" : "white",
                      fontWeight: isActive("/orders") ? "bold" : "normal",
                      borderBottom: isActive("/orders")
                        ? "2px solid yellow"
                        : "none",
                    }}
                    component={Link}
                    to="/orders"
                  >
                    Orders
                  </Button>
                </>
              )}

              {!isAuthenticated ? (
                <>
                  <Button
                    sx={{
                      color: isActive("/login") ? "yellow" : "white",
                      fontWeight: isActive("/login") ? "bold" : "normal",
                      borderBottom: isActive("/login")
                        ? "2px solid yellow"
                        : "none",
                    }}
                    component={Link}
                    to="/login"
                  >
                    Log In
                  </Button>
                  <Button
                    sx={{
                      color: isActive("/register") ? "yellow" : "white",
                      fontWeight: isActive("/register") ? "bold" : "normal",
                      borderBottom: isActive("/register")
                        ? "2px solid yellow"
                        : "none",
                    }}
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button variant="text" color="inherit" onClick={logout}>
                  Log Out
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
