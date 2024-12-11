import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Feedback from "./components/Feedback";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";

// RegisterWithLogout Component
function RegisterWithLogout() {
  localStorage.clear();
  return <Register />;
}

const App = () => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState({
    message: "",
    severity: "success",
    showAlert: false,
  });
  const handleFeedback = (type, message) => {
    setFeedback({
      message: message,
      severity: type,
      showAlert: true,
    });
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, showAlert: false }));
    }, 3000);
  };
  const toggleLanguage = () => {
    const currentLanguage = i18n.language || "en"; // Get current language from i18n
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    document.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  const theme = createTheme({
    direction: i18n.language === "ar" ? "rtl" : "ltr",
  });

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Feedback
        message={feedback.message}
        severity={feedback.severity}
        showAlert={feedback.showAlert}
      />
      <BrowserRouter>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handleFeedback={handleFeedback}
                  feedback={feedback}
                  toggleLanguage={toggleLanguage}
                />
              }
            />
            <Route
              path="/login"
              element={<Login handleFeedback={handleFeedback} />}
            />
            <Route path="/register" element={<RegisterWithLogout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
