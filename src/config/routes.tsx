import React from "react";
import {
  Business as BusinessIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import Departments from "../features/departments/Departments";
import Employees from "../features/employees/Employees";

export type RouteConfig = {
  path: string;
  text: string;
  icon: React.ReactNode;
  component: React.ComponentType;
};

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard/departments",
    text: "Departments",
    icon: <BusinessIcon />,
    component: Departments,
  },
  {
    path: "/dashboard/employees",
    text: "Employees",
    icon: <PeopleIcon />,
    component: Employees,
  },
];

export const defaultDashboardRoute = dashboardRoutes[0].path;
