export interface Employee {
  id: string;
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
  department?: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CreateEmployeeRequest {
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
}

export interface UpdateEmployeeRequest extends CreateEmployeeRequest {
  id: string;
}
