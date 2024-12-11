import React from "react";
import { Typography, Grid2 as Grid, Card } from "@mui/material";
import { useTranslation } from "react-i18next";

const PdfViewer = ({ selectedPdf }) => {
  const { t } = useTranslation();

  return (
    <Grid item size={5}>
      <Card variant="outlined" style={{ padding: 16, height: "100%" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
          {t("file_display_label")}
        </Typography>
        {selectedPdf ? (
          <iframe
            src={selectedPdf}
            style={{
              width: "100%",
              height: 800,
              marginTop: 16,
              border: "none",
            }}
          />
        ) : (
          <Typography
            variant="body1"
            style={{ marginTop: 16, fontStyle: "italic" }}
          >
            {t("no_pdf_selected")}
          </Typography>
        )}
      </Card>
    </Grid>
  );
};

export default PdfViewer;
