import React from "react";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

const AppButton: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  ...rest
}) => {
  return (
    <Button variant={variant} color={color} {...rest}>
      {children}
    </Button>
  );
};

export { AppButton };
