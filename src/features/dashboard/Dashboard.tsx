import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { dashboardRoutes, defaultDashboardRoute } from "../../config/routes";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={defaultDashboardRoute} replace />}
        />
        {dashboardRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path.replace("/dashboard", "")}
            element={<route.component />}
          />
        ))}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
