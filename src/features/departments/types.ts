export interface Department {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface DepartmentState {
  departments: Department[]
  loading: boolean
  error: string | null
}
