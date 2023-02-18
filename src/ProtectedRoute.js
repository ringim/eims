import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useUserAuth } from "./context";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  if (!user) {
    console.log("not authenticated.");
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
