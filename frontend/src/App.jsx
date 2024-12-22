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

if (!["en", "ar"].includes(i18n.language)) {
  i18n.changeLanguage("en"); // Default to English if the cached language is not valid
}
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
  const [language, setLanguage] = useState(i18n.language || "en"); // Initialize from i18n

  const handleFeedback = (type, message) => {
    setFeedback({
      message: message,
      severity: type,
      showAlert: true,
    });
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, showAlert: false }));
    }, 3500);
  };
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage).then(() => {
      setLanguage(newLanguage); // Update local state after changing language
      document.dir = newLanguage === "ar" ? "rtl" : "ltr"; // Update document direction
    });
  };

  useEffect(() => {
    document.dir = language === "ar" ? "rtl" : "ltr"; // Ensure document direction matches language
  }, [language]);

  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
  });

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
              element={
                <Login
                  handleFeedback={handleFeedback}
                  toggleLanguage={toggleLanguage}
                  language={i18n.language}
                />
              }
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
