import React from "react";
import { Typography, Box } from "@mui/material";

const Employees: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Employees
      </Typography>
      <Typography variant="body1">
        Employee management will be implemented here.
      </Typography>
    </Box>
  );
};

export default Employees;
