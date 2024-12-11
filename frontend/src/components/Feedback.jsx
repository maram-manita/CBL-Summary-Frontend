import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

const Feedback = ({ message, severity, showAlert }) => {
  return (
    <Snackbar
      open={showAlert}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Slide direction="up" in={showAlert}>
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Slide>
    </Snackbar>
  );
};

export default Feedback;