import React, { useEffect, useState } from "react";
import { IconButton, Box, Avatar } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import DataGrid from "../../components/DataGrid";
import type { GridColDef } from "@mui/x-data-grid";
import EmployeeForm from "./EmployeeForm";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useEmployees } from "./useEmployees";
import { useDepartments } from "../departments/useDepartments";
import type { Employee, CreateEmployeeRequest } from "./types";

const Employees: React.FC = () => {
  const {
    employees,
    loading,
    loadEmployees,
    addEmployee,
    editEmployee,
    removeEmployee,
  } = useEmployees();
  const { departments, loadDepartments } = useDepartments();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, [loadEmployees, loadDepartments]);

  const handleCreate = () => {
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "imageUrl",
      headerName: "Photo",
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Avatar
          src={
            params.value
              ? `${import.meta.env.VITE_WEB_APP_URL}${params.value}`
              : undefined
          }
          sx={{ width: 40, height: 40 }}
          alt={`${params.row.firstName} ${params.row.lastName}`}
        >
          {!params.value &&
            `${params.row.firstName?.[0] || ""}${
              params.row.lastName?.[0] || ""
            }`}
        </Avatar>
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 150,
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      valueGetter: (_value: unknown, row: Employee) => {
        return row.department?.name || "";
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "dateOfEmployment",
      headerName: "Hire Date",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleFormSubmit = async (values: CreateEmployeeRequest) => {
    try {
      if (selectedEmployee) {
        await editEmployee({
          id: selectedEmployee.id,
          ...values,
        });
      } else {
        await addEmployee(values);
      }
      setFormOpen(false);
      loadEmployees();
    } catch (error) {
      console.error("Failed to save employee:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await removeEmployee(employeeToDelete.id.toString());
        setDeleteModalOpen(false);
        setEmployeeToDelete(null);
        loadEmployees();
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <>
      <DataGrid
        title="Employees"
        columns={columns}
        rows={employees}
        loading={loading}
        height={500}
        showToolbar={true}
        pageSize={25}
        onCreateClick={handleCreate}
        createButtonText="Add Employee"
      />

      <EmployeeForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedEmployee || undefined}
        departments={departments.map((dept) => ({
          id: Number(dept.id),
          name: dept.name,
        }))}
        loading={loading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={
          employeeToDelete
            ? `Are you sure you want to delete "${employeeToDelete.firstName} ${employeeToDelete.lastName}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        loading={loading}
      />
    </>
  );
};

export default Employees;
