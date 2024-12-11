import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../App.css";

const paginationModel = { page: 0, pageSize: 8 };

const ReportsGrid = ({
  filteredData,
  selectedFiles,
  setSelectedFiles,
  handleViewPdf,
}) => {
  const { t } = useTranslation();

  return (
    <Box p={2}>
      <DataGrid
        rows={filteredData.map((row) => ({
          id: row.id,
          name: row.name,
          pdfPath: row.pdf_path,
        }))}
        columns={[
          {
            field: "name",
            headerName: "File Name",
            flex: 1,
            renderCell: (params) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {params.value}
              </Box>
            ),
          },
          {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => handleViewPdf(params.row.pdfPath)}
                  sx={{
                    border: "1px solid #194BFB",
                    padding: "4px 12px",
                    borderRadius: 2,
                    color: "#194BFB",
                    fontWeight: "bold",
                    background: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#194BFB",
                      color: "#fff",
                    },
                  }}
                >
                  {t("view_button_text")}
                </Button>
              </Box>
            ),
          },
        ]}
        initialState={{ pagination: { paginationModel } }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            display: "none", // Hide header
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgb(25, 75, 251,0.05)", // Change the hover background color of the rows
          },
          "& .MuiDataGrid-checkboxInput": {
            color: "#2683e8", // Default checkbox color
            "&.Mui-checked": {
              color: "#194BFB", // Checkbox color when checked
            },
          },
          overflowY: "hidden",
          overflowX: "hidden",
        }}
        pageSizeOptions={[8, 16]}
        checkboxSelection
        rowSelectionModel={selectedFiles}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedFiles(newSelection);
        }}
      />
    </Box>
  );
};

export default ReportsGrid;
