import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  useGridApiContext,
} from "@mui/x-data-grid";
import type {
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

// Custom toolbar without export functionality
function CustomToolbar() {
  const apiRef = useGridApiContext();
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    // Apply quick filter to the grid
    apiRef.current.setQuickFilterValues(value ? [value] : []);
  };

  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <Box sx={{ flexGrow: 1 }} />
      <TextField
        size="small"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
        sx={{ width: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </GridToolbarContainer>
  );
}

type Props = {
  rows: GridRowsProp;
  columns: GridColDef[];
  title?: string;
  loading?: boolean;
  height?: number | string;
  showToolbar?: boolean;
  pageSize?: number;
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  onRowSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
  sx?: object;
  onCreateClick?: () => void;
  createButtonText?: string;
};

const DataGridComponent: React.FC<Props> = ({
  rows,
  columns,
  title,
  loading = false,
  height = 400,
  showToolbar = true,
  pageSize = 25,
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  onRowSelectionModelChange,
  sx,
  onCreateClick,
  createButtonText = "Create",
}) => {
  return (
    <Paper sx={{ width: "100%", ...sx }}>
      {title && (
        <Box 
          sx={{ 
            p: 2, 
            borderBottom: "1px solid", 
            borderColor: "divider",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {onCreateClick && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateClick}
              size="small"
            >
              {createButtonText}
            </Button>
          )}
        </Box>
      )}
      <Box sx={{ height, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          showToolbar={showToolbar}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableColumnMenu={true}
          initialState={{
            pagination: {
              paginationModel: { pageSize, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          onRowSelectionModelChange={onRowSelectionModelChange}
          slots={showToolbar ? { toolbar: CustomToolbar } : {}}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "grey.50",
              borderBottom: "2px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DataGridComponent;
