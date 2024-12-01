import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token && !localStorage.getItem("token")) {
    console.log("Aucun token trouvé, redirection vers /login");
    return <Navigate to="/login" />;
  }

  // Sinon, on affiche les enfants (la route protégée)
  return children;
};

export default PrivateRoute;
