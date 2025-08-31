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
  MenuItem,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { TextInput } from "../../components/Input";
import { AppButton } from "../../components/Button";
import { ImageUpload } from "../../components/ImageUpload";
import type { Employee } from "./types";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  jobTitle: string;
  imageUrl: string;
  address: string;
  dateOfEmployment: string;
  departmentId: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<Employee>;
  onSubmit: (
    values: Omit<FormValues, "departmentId"> & { departmentId: number }
  ) => Promise<void>;
  loading?: boolean;
  departments?: Array<{ id: number; name: string }>;
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female"], "Please select a valid gender"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  jobTitle: Yup.string()
    .required("Job title is required")
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must not exceed 100 characters"),
  imageUrl: Yup.string()
    .required("Profile image is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  dateOfEmployment: Yup.date()
    .required("Date of employment is required")
    .max(new Date(), "Date of employment cannot be in the future"),
  departmentId: Yup.string().required("Department is required"),
});

const EmployeeForm: React.FC<Props> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  loading = false,
  departments = [],
}) => {
  const isEditing = Boolean(initialData?.id);

  const initialValues: FormValues = {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    gender: initialData?.gender || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    jobTitle: initialData?.jobTitle || "",
    imageUrl: initialData?.imageUrl || "",
    address: initialData?.address || "",
    dateOfEmployment: initialData?.dateOfEmployment || "",
    departmentId: initialData?.departmentId?.toString() || "",
  };

  const handleSubmit = async (values: FormValues) => {
    await onSubmit({
      ...values,
      departmentId: parseInt(values.departmentId, 10),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="employee-form-title"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form>
            <DialogTitle id="employee-form-title">
              {isEditing ? "Edit Employee" : "Create Employee"}
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
              <Box sx={{ pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Name Fields */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextInput
                      name="firstName"
                      label="First Name"
                      value={formikProps.values.firstName}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.firstName &&
                        Boolean(formikProps.errors.firstName)
                      }
                      helperText={
                        formikProps.touched.firstName &&
                        formikProps.errors.firstName
                      }
                      required
                      autoFocus
                    />
                    <TextInput
                      name="lastName"
                      label="Last Name"
                      value={formikProps.values.lastName}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.lastName &&
                        Boolean(formikProps.errors.lastName)
                      }
                      helperText={
                        formikProps.touched.lastName &&
                        formikProps.errors.lastName
                      }
                      required
                    />
                  </Box>

                  {/* Contact Fields */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextInput
                      name="email"
                      label="Email"
                      type="email"
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.email &&
                        Boolean(formikProps.errors.email)
                      }
                      helperText={
                        formikProps.touched.email && formikProps.errors.email
                      }
                      required
                    />
                    <TextInput
                      name="phoneNumber"
                      label="Phone Number"
                      value={formikProps.values.phoneNumber}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.phoneNumber &&
                        Boolean(formikProps.errors.phoneNumber)
                      }
                      helperText={
                        formikProps.touched.phoneNumber &&
                        formikProps.errors.phoneNumber
                      }
                      required
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                      }}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Box>

                  {/* Personal Info */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextInput
                      name="gender"
                      label="Gender"
                      select
                      value={formikProps.values.gender}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.gender &&
                        Boolean(formikProps.errors.gender)
                      }
                      helperText={
                        formikProps.touched.gender && formikProps.errors.gender
                      }
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextInput>
                    <TextInput
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      value={formikProps.values.dateOfBirth}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.dateOfBirth &&
                        Boolean(formikProps.errors.dateOfBirth)
                      }
                      helperText={
                        formikProps.touched.dateOfBirth &&
                        formikProps.errors.dateOfBirth
                      }
                      required
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        max: new Date().toISOString().split('T')[0]
                      }}
                    />
                  </Box>

                  {/* Job Info */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextInput
                      name="jobTitle"
                      label="Job Title"
                      value={formikProps.values.jobTitle}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.jobTitle &&
                        Boolean(formikProps.errors.jobTitle)
                      }
                      helperText={
                        formikProps.touched.jobTitle &&
                        formikProps.errors.jobTitle
                      }
                      required
                    />
                    <TextInput
                      name="departmentId"
                      label="Department"
                      select
                      value={formikProps.values.departmentId}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.departmentId &&
                        Boolean(formikProps.errors.departmentId)
                      }
                      helperText={
                        formikProps.touched.departmentId &&
                        formikProps.errors.departmentId
                      }
                      required
                    >
                      {departments.map((department) => (
                        <MenuItem
                          key={department.id}
                          value={department.id.toString()}
                        >
                          {department.name}
                        </MenuItem>
                      ))}
                    </TextInput>
                  </Box>

                  {/* Image Upload */}
                  <ImageUpload
                    value={formikProps.values.imageUrl}
                    onChange={(imageUrl) => formikProps.setFieldValue('imageUrl', imageUrl)}
                    onBlur={() => formikProps.setFieldTouched('imageUrl', true)}
                    error={
                      formikProps.touched.imageUrl &&
                      Boolean(formikProps.errors.imageUrl)
                    }
                    helperText={
                      formikProps.touched.imageUrl && formikProps.errors.imageUrl
                        ? String(formikProps.errors.imageUrl)
                        : undefined
                    }
                    disabled={loading}
                  />

                  {/* Address and Employment Date */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextInput
                      name="address"
                      label="Address"
                      value={formikProps.values.address}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.address &&
                        Boolean(formikProps.errors.address)
                      }
                      helperText={
                        formikProps.touched.address &&
                        formikProps.errors.address
                      }
                      required
                      multiline
                      rows={2}
                    />
                    <TextInput
                      name="dateOfEmployment"
                      label="Date of Employment"
                      type="date"
                      value={formikProps.values.dateOfEmployment}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      error={
                        formikProps.touched.dateOfEmployment &&
                        Boolean(formikProps.errors.dateOfEmployment)
                      }
                      helperText={
                        formikProps.touched.dateOfEmployment &&
                        formikProps.errors.dateOfEmployment
                      }
                      required
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        max: new Date().toISOString().split('T')[0]
                      }}
                    />
                  </Box>
                </Box>
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

export default EmployeeForm;
