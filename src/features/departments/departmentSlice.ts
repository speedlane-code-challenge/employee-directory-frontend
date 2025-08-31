import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, del, post, put } from "aws-amplify/api";
import type { Department, DepartmentState, ApiResponse } from "./types";

// Async thunk for fetching departments
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const restOperation = get({
        apiName: "EmployeeDirectory",
        path: "/departments",
      });
      const response = await restOperation.response;
      const apiResponse =
        (await response.body.json()) as unknown as ApiResponse<Department[]>;

      if (apiResponse.success) {
        return apiResponse.data;
      } else {
        return rejectWithValue("API returned success: false");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch departments"
      );
    }
  }
);

// Async thunk for creating a department
export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (
    departmentData: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const restOperation = post({
        apiName: "EmployeeDirectory",
        path: "/departments",
        options: {
          body: departmentData,
        },
      });
      const response = await restOperation.response;
      const apiResponse =
        (await response.body.json()) as unknown as ApiResponse<Department>;

      if (apiResponse.success) {
        return apiResponse.data;
      } else {
        return rejectWithValue("API returned success: false");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create department"
      );
    }
  }
);

// Async thunk for updating a department
export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async (
    {
      id,
      ...departmentData
    }: { id: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const restOperation = put({
        apiName: "EmployeeDirectory",
        path: `/departments/${id}`,
        options: {
          body: departmentData,
        },
      });
      const response = await restOperation.response;
      const apiResponse =
        (await response.body.json()) as unknown as ApiResponse<Department>;

      if (apiResponse.success) {
        return apiResponse.data;
      } else {
        return rejectWithValue("API returned success: false");
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update department"
      );
    }
  }
);

// Async thunk for deleting a department
export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (departmentId: string, { rejectWithValue }) => {
    try {
      const restOperation = del({
        apiName: "EmployeeDirectory",
        path: `/departments/${departmentId}`,
      });
      await restOperation.response;
      return departmentId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete department"
      );
    }
  }
);

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch departments
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create department
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update department
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.id
        );
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = departmentSlice.actions;
export default departmentSlice.reducer;
