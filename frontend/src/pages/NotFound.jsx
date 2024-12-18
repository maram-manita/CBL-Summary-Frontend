import { Typography, Stack, Button, Box } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
  alignItems: "center",
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

function NotFound() {
  const navigate = useNavigate();
  return (
    <SignInContainer
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <CardCustom>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "62px",
            wordSpacing: "-0.1em",
            fontWeight: "bold",
            textAlign: "center",
            color: "#373943",
            marginBottom: "-12px",
          }}
        >
          404
        </Typography>
        <Typography
          sx={{ fontSize: "30px", wordSpacing: "-0.1em", fontWeight: "bold" }}
        >
          Page Not Found
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          The page you clicked does not exist or may have been moved to another
          place.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            sx={{
              backgroundColor: "#194BFB",
              padding: "8px 12px",
              borderRadius: 2,
              color: "white",
              fontWeight: "bold",
              marginTop: "12px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <FaArrowLeft style={{ margin: "0 4px" }} />
            Back to home
          </Button>
        </Box>
      </CardCustom>
    </SignInContainer>
  );
}

export default NotFound;
