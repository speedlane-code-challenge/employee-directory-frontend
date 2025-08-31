import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post, get, put, del } from "aws-amplify/api";
import type {
  Employee,
  EmployeeState,
  ApiResponse,
  UpdateEmployeeRequest,
} from "./types";

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const restOperation = get({
        apiName: "EmployeeDirectory",
        path: "/employees",
      });
      const response = await restOperation.response;
      const apiResponse =
        (await response.body.json()) as unknown as ApiResponse<Employee[]>;

      if (apiResponse.success) {
        return apiResponse.data;
      } else {
        return rejectWithValue("API returned success: false");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch employees"
      );
    }
  }
);

// Async thunk for creating an employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (
    employeeData: {
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
      departmentId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const restOperation = post({
        apiName: "EmployeeDirectory",
        path: "/employees",
        options: {
          body: employeeData,
        },
      });
      const response = await restOperation.response;
      const apiResponse =
        (await response.body.json()) as unknown as ApiResponse<Employee>;

      if (apiResponse.success) {
        return apiResponse.data;
      } else {
        return rejectWithValue("API returned success: false");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create employee"
      );
    }
  }
);

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employeeData: UpdateEmployeeRequest, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = employeeData;
      const restOperation = put({
        apiName: "EmployeeDirectory",
        path: `/employees/${id}`,
        options: {
          body: updateData,
        },
      });
      const response = await restOperation.response;
      const apiResponse =
        (await response.body.json()) as unknown as ApiResponse<Employee>;

      if (apiResponse.success) {
        return apiResponse.data;
      } else {
        return rejectWithValue("API returned success: false");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update employee"
      );
    }
  }
);

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId: string, { rejectWithValue }) => {
    try {
      const restOperation = del({
        apiName: "EmployeeDirectory",
        path: `/employees/${employeeId}`,
      });
      await restOperation.response;
      return employeeId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete employee"
      );
    }
  }
);

// Initial state
const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch employees";
      })
      // Create employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to create employee";
      })
      // Update employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to update employee";
      })
      // Delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to delete employee";
      });
  },
});

export const { clearError } = employeeSlice.actions;

// Selectors
export const selectAllEmployees = (state: { employees: EmployeeState }) =>
  state.employees.employees;
export const selectEmployeesLoading = (state: { employees: EmployeeState }) =>
  state.employees.loading;
export const selectEmployeesError = (state: { employees: EmployeeState }) =>
  state.employees.error;

export default employeeSlice.reducer;
