import React from "react";
import { Formik, Form } from "formik";
import type { FormikProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { TextInput } from "../../components/Input";
import { AppButton } from "../../components/Button";
import type { Department } from "./types";

type FormValues = {
  name: string;
  description: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<Department>;
  onSubmit: (values: FormValues) => Promise<void>;
  loading?: boolean;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Department name is required")
    .min(2, "Department name must be at least 2 characters")
    .max(100, "Department name must not exceed 100 characters"),
  description: Yup.string()
    .required("Department description is required")
    .max(500, "Description must not exceed 500 characters"),
});

const DepartmentForm: React.FC<Props> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  loading = false,
}) => {
  const isEditing = Boolean(initialData?.id);

  const initialValues: FormValues = {
    name: initialData?.name || "",
    description: initialData?.description || "",
  };

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="department-form-title"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form>
            <DialogTitle id="department-form-title">
              {isEditing ? "Edit Department" : "Create Department"}
              {!loading && (
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </DialogTitle>

            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
              >
                <TextInput
                  name="name"
                  label="Department Name"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={
                    formikProps.touched.name && Boolean(formikProps.errors.name)
                  }
                  helperText={
                    formikProps.touched.name && formikProps.errors.name
                  }
                  required
                  autoFocus
                />
                <TextInput
                  name="description"
                  label="Description"
                  value={formikProps.values.description}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={
                    formikProps.touched.description &&
                    Boolean(formikProps.errors.description)
                  }
                  helperText={
                    formikProps.touched.description &&
                    formikProps.errors.description
                  }
                  multiline
                  required
                  rows={3}
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <AppButton
                onClick={onClose}
                disabled={loading}
                variant="outlined"
              >
                Cancel
              </AppButton>
              <AppButton
                type="submit"
                variant="contained"
                disabled={loading || !formikProps.isValid || !formikProps.dirty}
                sx={{ minWidth: 100 }}
              >
                {loading ? "Saving..." : "Save"}
              </AppButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default DepartmentForm;
