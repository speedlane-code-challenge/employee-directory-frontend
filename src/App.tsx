import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/login/Login.component";
import Dashboard from "./features/dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Navigate to="/login" replace />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
