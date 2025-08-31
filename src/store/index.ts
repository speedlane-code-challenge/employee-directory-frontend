import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './alertSlice'
import departmentReducer from '../features/departments/departmentSlice'
import employeeReducer from '../features/employees/employeeSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    departments: departmentReducer,
    employees: employeeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
