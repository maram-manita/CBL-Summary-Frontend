import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Summary from "../components/Summary";
import ReportsGrid from "../components/ReportsGrid";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import PdfViewer from "../components/PdfViewer";
import { Typography, Grid2 as Grid, Box, Skeleton } from "@mui/material";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { getReports } from "../api"; // Import getReports function
import LoadingSkeleton from "../components/LoadingSkeleton";

const Home = ({ handleFeedback, toggleLanguage }) => {
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ reportType: "", year: "" });

  const { t } = useTranslation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const jsonData = await getReports();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      console.log(data.length);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((row) => {
    const matchesReportType = filters.reportType
      ? row.report_type === filters.reportType
      : true;
    const matchesYear = filters.year ? row.year === filters.year : true;
    return matchesReportType && matchesYear;
  });

  const handleViewPdf = (pdfPath) => {
    setSelectedPdf(pdfPath);
  };

  return (
    <ProtectedRoute>
      <Navbar toggleLanguage={toggleLanguage} />
      <Box p={2}>
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            wordSpacing: "-0.1em",
            fontSize: {
              xs: "32px",
              sm: "42px",
              md: "52px",
            },
          }}
        >
          {t("page_title")}
        </Typography>
      </Box>
      {!loading || data.length > 0 ? (
        <>
          <Filters
            handleFilterChange={handleFilterChange}
            data={data}
            filters={filters}
          />
          <ReportsGrid
            filteredData={filteredData}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            handleViewPdf={handleViewPdf}
          />
          <Grid container spacing={2} p={2}>
            <Summary
              selectedFiles={selectedFiles}
              language={i18n.language}
              data={data}
              handleFeedback={handleFeedback}
            />
            <PdfViewer selectedPdf={selectedPdf} />
          </Grid>
        </>
      ) : (
        <LoadingSkeleton />
      )}
    </ProtectedRoute>
  );
};

export default Home;
