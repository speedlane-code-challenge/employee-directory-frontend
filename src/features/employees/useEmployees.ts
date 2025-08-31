import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchEmployees,
  deleteEmployee,
  createEmployee,
  updateEmployee,
} from "./employeeSlice";
import type { CreateEmployeeRequest, UpdateEmployeeRequest } from "./types";

export const useEmployees = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector(
    (state: RootState) => state.employees
  );

  const loadEmployees = useCallback(() => {
    console.log("Loading employees...");
    dispatch(fetchEmployees());
  }, [dispatch]);

  const removeEmployee = useCallback(
    (employeeId: string) => {
      return dispatch(deleteEmployee(employeeId)).unwrap();
    },
    [dispatch]
  );

  const addEmployee = useCallback(
    (employeeData: CreateEmployeeRequest) => {
      return dispatch(createEmployee(employeeData)).unwrap();
    },
    [dispatch]
  );

  const editEmployee = useCallback(
    (employeeData: UpdateEmployeeRequest) => {
      return dispatch(updateEmployee(employeeData)).unwrap();
    },
    [dispatch]
  );

  return {
    employees,
    loading,
    error,
    loadEmployees,
    removeEmployee,
    addEmployee,
    editEmployee,
  };
};
