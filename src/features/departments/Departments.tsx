import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "../../components/DataGrid";
import ConfirmationModal from "../../components/ConfirmationModal";
import DepartmentForm from "./DepartmentForm";
import { useDepartments } from "./useDepartments";
import { useAlertActions } from "../../hooks/useAlertRedux";
import type { Department } from "./types";

const Departments: React.FC = () => {
  const {
    departments,
    loading,
    error,
    loadDepartments,
    removeDepartment,
    addDepartment,
    editDepartment,
  } = useDepartments();
  const { showError, showSuccess } = useAlertActions();

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Form modal state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const handleCreate = () => {
    setEditingDepartment(null);
    setFormModalOpen(true);
  };

  const handleEdit = (departmentId: string) => {
    const department = departments.find((dept) => dept.id === departmentId);
    if (department) {
      setEditingDepartment(department);
      setFormModalOpen(true);
    }
  };

  const handleFormSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      if (editingDepartment) {
        // Update existing department
        await editDepartment({
          id: editingDepartment.id,
          name: values.name,
          description: values.description,
        });
        showSuccess(`Department "${values.name}" updated successfully`);
      } else {
        // Create new department
        await addDepartment({
          name: values.name,
          description: values.description,
        });
        showSuccess(`Department "${values.name}" created successfully`);
      }
      setFormModalOpen(false);
      setEditingDepartment(null);
    } catch (error) {
      console.error("Failed to save department:", error);
      showError(
        editingDepartment
          ? "Failed to update department"
          : "Failed to create department"
      );
    }
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setEditingDepartment(null);
  };

  const handleDelete = (departmentId: string, departmentName: string) => {
    setDepartmentToDelete({ id: departmentId, name: departmentName });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!departmentToDelete) return;

    try {
      await removeDepartment(departmentToDelete.id);
      showSuccess(
        `Department "${departmentToDelete.name}" deleted successfully`
      );
      setDeleteModalOpen(false);
      setDepartmentToDelete(null);
    } catch (error) {
      console.error("Failed to delete department:", error);
      showError("Failed to delete department");
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDepartmentToDelete(null);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
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
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit Department">
            <IconButton
              size="small"
              onClick={() => handleEdit(params.row.id)}
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Department">
            <IconButton
              size="small"
              onClick={() => handleDelete(params.row.id, params.row.name)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <DataGridComponent
        title="Departments"
        rows={departments}
        columns={columns}
        loading={loading}
        height={500}
        showToolbar={true}
        pageSize={25}
        onCreateClick={handleCreate}
        createButtonText="Create Department"
      />

      {/* Form Modal for Create/Edit */}
      <DepartmentForm
        open={formModalOpen}
        onClose={handleCloseFormModal}
        initialData={editingDepartment || undefined}
        onSubmit={handleFormSubmit}
        loading={loading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Department"
        message={
          departmentToDelete
            ? `Are you sure you want to delete the department "${departmentToDelete.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        loading={loading}
      />
    </Box>
  );
};

export default Departments;
