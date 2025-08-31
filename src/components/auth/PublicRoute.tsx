import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import { CircularProgress, Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const PublicRoute: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if not authenticated
  return <>{children}</>;
};

export default PublicRoute;
