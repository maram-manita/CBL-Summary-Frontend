import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { HiOutlineGlobeAlt, HiOutlineMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Navbar = ({ toggleLanguage }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
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
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src="/images/logo2.png" alt="Logo" style={{ height: 35 }} />
        </Typography>

        <Box
          display={{ xs: "none", sm: "flex" }}
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleLogout} // Call the handleLogout function
          >
            {t("logout")}
          </Button>
        </Box>
        <Box display={{ xs: "block", sm: "none" }}>
          <HiOutlineMenu
            style={{ fontSize: "2rem" }}
            onClick={() => {
              setOpenDrawer(!openDrawer);
            }}
          />
        </Box>
        <Drawer
          anchor="top"
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <Box
            sx={{
              width: 250,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button
              onClick={toggleLanguage}
              sx={{
                color: "black",

                padding: "8px 12px",

                fontWeight: "bold",

                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {i18n.language === "en" ? "العربية" : "English"}
              <HiOutlineGlobeAlt style={{ margin: "0px 4px" }} />
            </Button>

            <Button
              sx={{
                color: "#262626",
                // border: "1px solid black",
                padding: "8px 12px",
                borderRadius: 8,
                backgroundColor: "white",
                fontWeight: "bold",
                marginBottom: 2,
                display: "flex",
                justifyContent: "center",
              }}
              onClick={handleLogout}
            >
              {t("logout")}
            </Button>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
