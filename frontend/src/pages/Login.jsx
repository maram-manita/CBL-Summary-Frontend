import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../App.css";
import {
  FormLabel,
  Box,
  CircularProgress,
  TextField,
  FormControl,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const CardCustom = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: "8px",
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Login = ({ handleFeedback, toggleLanguage, language }) => {
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisibile, setPasswordVisibile] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      handleFeedback("error", t("login_error"));
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };
  const { t } = useTranslation();

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <div>
        <Button onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </Button>
      </div>

      <CardCustom>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "34px",
            wordSpacing: "-0.1em",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          {t("sign_in")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="name" sx={{ marginBottom: "8px" }}>
              {t("username")}
            </FormLabel>
            <TextField
              error={userNameError}
              // helperText={emailErrorMessage}
              id="name"
              type="text"
              name="name"
              placeholder={t("username")}
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={userNameError ? "error" : "primary"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ marginBottom: "8px" }}>
              {t("password")}
            </FormLabel>

            <div style={{ position: "relative" }}>
              <TextField
                error={passwordError}
                // helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••••"
                type={passwordVisibile ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                style={{
                  position: "absolute",
                  [language === "ar" ? "left" : "right"]: "10px",
                  top: "55%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPasswordVisibile(!passwordVisibile);
                }}
              >
                {!passwordVisibile ? (
                  <PiEyeClosedBold
                    style={{ fontSize: "20px", color: "#00000099" }}
                  />
                ) : (
                  <PiEyeBold style={{ fontSize: "20px", color: "#00000099" }} />
                )}
              </span>
            </div>
          </FormControl>

          {loading ? (
            <CircularProgress
              size={"30px"}
              sx={{ marginTop: 2, alignSelf: "center" }}
            />
          ) : (
            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#194BFB",
                padding: "8px 12px",
                borderRadius: 2,
                color: "white",
                fontWeight: "bold",
                marginTop: "12px",
              }}
            >
              {t("login")}
            </Button>
          )}
        </Box>
      </CardCustom>
    </SignInContainer>
  );
};

export default Login;
