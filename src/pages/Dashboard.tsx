import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Departments from '../features/departments/Departments'
import Employees from '../features/employees/Employees'

const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/departments" replace />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRoutes
