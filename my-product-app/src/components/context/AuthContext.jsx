import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create a context for authentication state
const AuthContext = createContext();

// Create a context hook for authentication state with default properties
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initializing state directly from localStorage for token
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken); // true if token exists
  const navigate = useNavigate();

  // Synchronize axios headers when token is updated
  useEffect(() => {
    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers["Authorization"];
    }
  }, [token]);

  // Handle login: Set authentication state and navigate
  const login = (newToken, user, url) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");

    if (url) {
      navigate(url); // Redirect to specified URL after login
    }
  };

  // Handle logout: Reset authentication state and clear localStorage
  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    axios.defaults.headers["Authorization"] = "";
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
