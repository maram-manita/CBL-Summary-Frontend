import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBackdrop = ({ isOpen }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
