import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import type { RootState, AppDispatch } from '../../store'
import { 
  fetchDepartments, 
  deleteDepartment, 
  createDepartment, 
  updateDepartment, 
  clearError 
} from './departmentSlice'

export const useDepartments = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { departments, loading, error } = useSelector((state: RootState) => state.departments)

  const loadDepartments = useCallback(() => {
    dispatch(fetchDepartments())
  }, [dispatch])

  const removeDepartment = useCallback((departmentId: string) => {
    return dispatch(deleteDepartment(departmentId)).unwrap()
  }, [dispatch])

  const addDepartment = useCallback((departmentData: { name: string; description: string }) => {
    return dispatch(createDepartment(departmentData)).unwrap()
  }, [dispatch])

  const editDepartment = useCallback((departmentData: { id: string; name: string; description: string }) => {
    return dispatch(updateDepartment(departmentData)).unwrap()
  }, [dispatch])

  const clearDepartmentError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    departments,
    loading,
    error,
    loadDepartments,
    removeDepartment,
    addDepartment,
    editDepartment,
    clearDepartmentError,
  }
}
