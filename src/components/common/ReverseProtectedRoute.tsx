import React from "react";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

const ReverseProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;
  if (user !== null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ReverseProtectedRoute;
