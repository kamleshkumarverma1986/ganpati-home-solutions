import React, { useState, memo } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  DataGridPremium,
  GridToolbar,
  GRID_CHECKBOX_SELECTION_FIELD,
} from "@mui/x-data-grid-premium";

const StyledDataGridPremium = styled(DataGridPremium)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === "light" ? "#f0f0f0" : "#303030"}`,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-cell": {
      color:
        theme.palette.mode === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.65)",
    },
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "inherit",
  width: "100%",
  '& div[style*="color: rgba(130, 130, 130, 0.62)"]': {
    display: "none",
  },
  "& .MuiFormGroup-options": {
    alignItems: "center",
    paddingBottom: theme.spacing(1),
    "& > div": {
      minWidth: 100,
      margin: theme.spacing(2),
      marginLeft: 0,
    },
  },
  "& .MuiDataGrid-pinnedColumns": {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  },
}));

const DataGrid = ({
  height,
  loading,
  listData,
  initialPageSize,
  onPageChange,
  checkboxSelection = false,
  onSelectionModelChange = () => {},
}) => {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  // eslint-disable-next-line no-unused-vars
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([
    10, 50, 100, 200, 400, 800, 1600, 3200,
  ]);

  const onPageChangeHandle = (newPageNumber) => {
    setPageNumber(newPageNumber);
    onPageChange(pageSize, newPageNumber);
  };

  /*
    useEffect(() => {
      if (!!listData && listData.rowCount < rowsPerPageOptions[0] ) {
        setRowsPerPageOptions([1, ...rowsPerPageOptions]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listData]);
    */

  const onPageSizeChangeHandle = (newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(0);
    onPageChange(newPageSize, 0);
  };

  return (
    <StyledBox sx={{ height }}>
      <StyledDataGridPremium
        {...listData}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: { showQuickFilter: true },
        }}
        loading={loading}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick
        rowThreshold={0}
        initialState={{
          pinnedColumns: {
            left: [GRID_CHECKBOX_SELECTION_FIELD, "fullname"],
            right: ["actions"],
          },
        }}
        page={pageNumber}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChangeHandle}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={onPageChangeHandle}
        paginationMode="server"
        pagination
        onSelectionModelChange={onSelectionModelChange}
      />
    </StyledBox>
  );
};

export default memo(DataGrid);
