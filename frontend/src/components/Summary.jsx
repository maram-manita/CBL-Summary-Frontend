// frontend/src/components/Summary.jsx
import React, { useState, useRef } from "react";
import {
  Typography,
  Button,
  Card,
  Grid2 as Grid,
  CircularProgress,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { MuiMarkdown, getOverrides } from "mui-markdown";
import { summarizeReports, exportWord } from "../api";
import { BiExport } from "react-icons/bi";
import { GrDocumentPdf, GrDocumentWord } from "react-icons/gr";

import { HiDownload } from "react-icons/hi";
import html2pdf from "html2pdf.js";
import { TbFileTypeDocx, TbFileTypePdf } from "react-icons/tb";

const Summary = ({ selectedFiles, language, handleFeedback, data }) => {
  const { t } = useTranslation();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchSummary = async () => {
    console.log(selectedFiles);
    setLoading(true);
    try {
      const response = await summarizeReports(selectedFiles, language || "en");
      setSummary(response.summary);
      handleFeedback("success", t("summary_success_message"));
    } catch (error) {
      console.error("Error fetching summary:", error);
      handleFeedback("error", t("summary_error_message"));
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    const baseURL = "https://ai-api.tatweer.dev";
    setExporting(true);
    try {
      const response = await exportWord(summary, language || "en");
      handleFeedback("success", "File export successfully");

      if (response.pdf_url) {
        const link = document.createElement("a");
        link.href = `${baseURL}${response.pdf_url}`;
        link.download = `${selectedFiles}.pdf`; // Adjust file name if needed
        link.target = "_blank"; // Opens the file in a new tab
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      handleFeedback("error", t("pdf_export_error_message"));
    } finally {
      setExporting(false);
    }
  };

  const exportToWord = async () => {
    const baseURL = "https://ai-api.tatweer.dev";
    setExporting(true);
    try {
      const response = await exportWord(summary, language || "en");
      handleFeedback("success", "File export successfully");

      if (response.docx_url) {
        const link = document.createElement("a");
        link.href = `${baseURL}${response.docx_url}`;
        link.download = `${selectedFiles}.docx`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error exporting Word:", error);
      handleFeedback("error", t("word_export_error_message"));
    } finally {
      setExporting(false);
    }
  };

  return (
    <Grid item size={{ xs: 12, sm: 7 }}>
      <Card variant="outlined" style={{ padding: 16, height: "100%" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
          {t("summary_label")}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {!loading ? (
            <Button
              disabled={selectedFiles.length === 0}
              onClick={fetchSummary}
              style={{ marginTop: 16 }}
              sx={{
                backgroundColor: "#194BFB",
                padding: "8px 12px",
                borderRadius: 2,
                color: "white",
                fontWeight: "bold",
                "&.Mui-disabled": {
                  backgroundColor: "#E0E0E0",
                  color: "#B1ACA6",
                },
              }}
            >
              {t("summarize_button_text")}
            </Button>
          ) : (
            <CircularProgress size="30px" sx={{ marginTop: 2 }} />
          )}
          {summary && (
            <div>
              <Button
                onClick={(event) => {
                  setAnchorEl(event.currentTarget); // Set the button as the anchor element
                  setOpen(!open);
                }}
                style={{ marginTop: 16 }}
                sx={{
                  border: "1px solid #194BFB",
                  padding: "8px 12px",
                  borderRadius: 2,
                  color: "#194BFB",
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: "bold",
                  background: "none",
                  transition: "all 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                  "&:hover": {
                    background: "#194BFB",
                    color: "#fff",
                  },

                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <HiDownload /> Export
              </Button>
              <Menu
                id="basic-menu"
                open={open}
                onClose={() => {
                  setOpen(false);
                  setAnchorEl(null);
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  style: {
                    marginTop: "8px",
                  },
                }}
              >
                <MenuItem>
                  <Button
                    onClick={exportToWord}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <GrDocumentWord /> Export to Word
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={exportToPDF}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <GrDocumentPdf /> Export to PDF
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Box>

        <Typography
          sx={{ padding: { xs: "4px", sm: "12px" }, marginTop: "12px" }}
        >
          <div id="summary">
            <MuiMarkdown
              overrides={{
                ...getOverrides({}), // Keeps other default overrides
                h1: {
                  component: "p",
                  props: {
                    style: {
                      fontSize: isMobile ? "24px" : "32px",
                      fontWeight: "bold",
                      wordSpacing: "-0.1em",
                      margin: "8px 0",
                    },
                  },
                },
                h2: {
                  component: "p",
                  props: {
                    style: {
                      fontSize: isMobile ? "20px" : "24px",
                      fontWeight: "bold",
                      wordSpacing: "-0.1em",
                      margin: "4px 0",
                    },
                  },
                },
                h3: {
                  component: "p",
                  props: {
                    style: {
                      fontSize: "20px",
                      fontWeight: "bold",
                      wordSpacing: "-0.1em",
                      margin: "4px 0",
                    },
                  },
                },
                p: {
                  component: "p",
                  props: {
                    style: {
                      // marginTop: "4px",
                    },
                  },
                },
                ul: {
                  component: "p",
                  props: {
                    style: {
                      marginRight: "12px",
                    },
                  },
                },
              }}
            >
              {summary}
            </MuiMarkdown>
          </div>
        </Typography>
      </Card>
    </Grid>
  );
};

export default Summary;
