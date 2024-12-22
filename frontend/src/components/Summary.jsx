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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { MuiMarkdown, getOverrides } from "mui-markdown";
import { summarizeReports } from "../api";
import { BiExport } from "react-icons/bi";
import html2pdf from "html2pdf.js";

const Summary = ({ selectedFiles, language, handleFeedback, data }) => {
  const { t } = useTranslation();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await summarizeReports(selectedFiles, language || "en");
      // response should be { summary: "..." }
      setSummary(response.summary);
      handleFeedback("success", t("summary_success_message"));
    } catch (error) {
      console.error("Error fetching summary:", error);
      handleFeedback("error", t("summary_error_message"));
    } finally {
      setLoading(false);
    }
  };
  const exportToPDF = () => {
    const element = document.querySelector("#summary");

    html2pdf(element, {
      margin: 20,
    });
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
            <Button
              sx={{
                border: "1px solid #194BFB",
                padding: "8px 12px",
                borderRadius: 2,
                color: "#194BFB",
                fontWeight: "bold",
                background: "white",
              }}
              onClick={exportToPDF}
            >
              Export
            </Button>
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
