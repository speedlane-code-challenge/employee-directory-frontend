# Employee Directory Frontend

A modern React-based employee directory application built with TypeScript, MUI, and AWS Amplify. This application provides comprehensive employee and department management with features like CRUD operations, image uploads, and advanced search capabilities.

## 🚀 Features

- **Employee Management**: Complete CRUD operations for employee records
- **Department Management**: Full department management system
- **Image Upload**: Drag-and-drop image upload with AWS S3 integration
- **Advanced Search**: Real-time search across all employee and department data
- **Responsive Design**: Mobile-friendly interface using Material-UI
- **Form Validation**: Comprehensive form validation using Formik and Yup
- **State Management**: Redux Toolkit for efficient state management
- **Authentication**: Protected routes with login system

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v7
- **Data Grid**: MUI X DataGrid
- **State Management**: Redux Toolkit
- **Form Management**: Formik + Yup validation
- **File Upload**: React Dropzone
- **Backend Integration**: AWS Amplify API
- **Storage**: AWS S3 for image uploads
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── auth/                  # Authentication components
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   └── PublicRoute.tsx    # Public route wrapper
│   ├── layout/                # Layout components
│   │   └── DashboardLayout.tsx # Main dashboard layout
│   ├── Button.tsx             # Reusable button component
│   ├── ConfirmationModal.tsx  # Delete confirmation modal
│   ├── DataGrid.tsx           # Enhanced MUI DataGrid with search
│   ├── ImageUpload.tsx        # S3 image upload component
│   └── Input.tsx              # Reusable input component
├── config/                    # Configuration files
│   └── routes.tsx             # Application routes configuration
├── features/                  # Feature-based modules
│   ├── dashboard/             # Dashboard feature
│   │   └── Dashboard.tsx      # Main dashboard component
│   ├── departments/           # Department management
│   │   ├── DepartmentForm.tsx # Department create/edit form
│   │   ├── Departments.tsx    # Department list and management
│   │   ├── departmentSlice.ts # Redux slice for departments
│   │   ├── types.ts          # Department type definitions
│   │   └── useDepartments.ts  # Department hooks
│   ├── employees/             # Employee management
│   │   ├── EmployeeForm.tsx   # Employee create/edit form
│   │   ├── Employees.tsx      # Employee list and management
│   │   ├── employeeSlice.ts   # Redux slice for employees
│   │   ├── types.ts          # Employee type definitions
│   │   └── useEmployees.ts    # Employee hooks
│   └── login/                 # Authentication
│       └── Login.component.tsx # Login form
├── store/                     # Redux store configuration
│   ├── alertSlice.ts         # Alert/notification slice
│   └── index.ts              # Store configuration
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn package manager
- AWS Amplify CLI (for backend configuration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-directory-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Environment Setup

Before running the application, you need to set up environment variables:

1. **Copy the environment template**
   ```bash
   # For development
   cp .env.sample .env.dev
   
   # For production
   cp .env.sample .env.prod
   ```

2. **Configure environment variables**
   Edit the appropriate `.env.dev` or `.env.prod` file with your specific values:
   ```env
   VITE_WEB_APP_URL=https://your-cloudfront-domain.com
   VITE_API_ENDPOINT=https://your-api-gateway-url.com
   # Add other environment-specific variables
   ```

### Development Mode
```bash
# Uses .env.dev configuration
npm run dev
```
The application will start at `http://localhost:5173`

### Production Build
```bash
# Uses .env.prod configuration
npm run build:prod
```

### Development Build
```bash
# Uses .env.dev configuration
npm run build:dev
```

## 📋 API Endpoints

The application expects the following API endpoints:

### Departments
- `GET /departments` - Fetch all departments
- `POST /departments` - Create new department
- `PUT /departments/{id}` - Update department
- `DELETE /departments/{id}` - Delete department

### Employees
- `GET /employees` - Fetch all employees
- `POST /employees` - Create new employee
- `PUT /employees/{id}` - Update employee
- `DELETE /employees/{id}` - Delete employee

### API Response Format
```json
{
  "success": true,
  "data": [...],
  "message": "Operation successful"
}
```

## 🔐 Authentication

The application includes a protected route system:
- **Login Credentials**: `admin@example.com` / `Admin0!@#!@#!`
- **Protected Routes**: `/dashboard/*`
- **Public Routes**: `/login`, `/`
