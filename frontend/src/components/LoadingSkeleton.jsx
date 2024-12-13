import React from "react";
import {
  Typography,
  MenuItem,
  Select,
  Grid2 as Grid,
  Skeleton,
} from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} p={2}>
        <Grid item size={6}>
          <Skeleton height={70} sx={{ marginTop: "8px" }} variant="rounded" />
        </Grid>
        <Grid item size={6}>
          <Skeleton height={70} sx={{ marginTop: "8px" }} variant="rounded" />
        </Grid>
      </Grid>
      <Grid container p={2}>
        <Grid item size={12}>
          <Skeleton height={600} variant="rounded" />
        </Grid>
      </Grid>
      <Grid container p={2} spacing={2}>
        <Grid item size={7}>
          <Skeleton height={400} variant="rounded" />
        </Grid>
        <Grid item size={5}>
          <Skeleton height={400} variant="rounded" />
        </Grid>
      </Grid>
    </>
  );
};

export default LoadingSkeleton;
