import React from "react";
import { Typography, MenuItem, Select, Grid2 as Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Filters = ({ handleFilterChange, data, filters }) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} p={2}>
      <Grid item size={6}>
        <Typography variant="subtitle1" sx={{ marginBottom: "2px" }}>
          {t("report_type_label")}
        </Typography>
        <Select
          fullWidth
          value={filters.reportType}
          onChange={(e) => handleFilterChange("reportType", e.target.value)}
          displayEmpty
        >
          <MenuItem value="">{t("all")}</MenuItem>
          {[...new Set(data.map((row) => row.report_type))].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      {/* Year Filter */}
      <Grid item size={6}>
        <Typography variant="subtitle1" sx={{ marginBottom: "2px" }}>
          {t("year_label")}
        </Typography>
        <Select
          fullWidth
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          displayEmpty
          disabled={!filters.reportType && !data.length} // Disable if no data or no report type selected
        >
          <MenuItem value="">{t("all")}</MenuItem>
          {[
            ...new Set(
              data
                .filter((row) =>
                  filters.reportType
                    ? row.report_type === filters.reportType
                    : true
                )
                .map((row) => row.year)
            ),
          ]
            .sort((a, b) => a - b) // Sort years in ascending order
            .map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Filters;