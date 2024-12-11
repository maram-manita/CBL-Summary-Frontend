import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Navbar = ({ toggleLanguage }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#262626",
        boxShadow: "none",
        padding: "8px",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src="src/assets/logo2.png" alt="Logo" style={{ height: 40 }} />
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <Button
            onClick={toggleLanguage}
            sx={{
              color: "white",
              border: "1px solid white",
              padding: "4px 12px",
              borderRadius: 8,
              fontWeight: "bold",
            }}
          >
            <HiOutlineGlobeAlt style={{ margin: "0px 4px" }} />
            {i18n.language === "en" ? "العربية" : "English"}
          </Button>

          <Button
            sx={{
              color: "#262626",
              border: "1px solid white",
              padding: "4px 12px",
              borderRadius: 8,
              backgroundColor: "white",
              fontWeight: "bold",
            }}
            onClick={handleLogout} // Call the handleLogout function
          >
            {t("logout")}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
