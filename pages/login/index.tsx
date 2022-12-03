import { Box, Card, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import LoginForm from "../../component/login/loginForm";

export default function Login() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", py: 4, background: "#eeeeee", height: "100vh" }}>
      <Card sx={{ width: "450px", height: "500px", mx: "auto" }}>
        <Box
          sx={{
            width: "100%",
            height: "80px",
            background: "#53a8b6",
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
            p: 2,
            alignItems: "center",
          }}
        >
          <ArrowBackIosIcon style={{ color: "#FFF", cursor: "pointer" }} onClick={() => router.push("/")} />
          <Typography sx={{ textAlign: "center", color: "#FFF", fontSize: "30px" }}>Sign In</Typography>
          <Box></Box>
        </Box>
        <LoginForm />
        <Typography sx={{ color: "#000", textAlign: "center", mt: 2 }}>Don't have an account?</Typography>
        <Typography
          sx={{ color: "#53a8b6", fontWeight: "600", textAlign: "center", my: 1, cursor: "pointer" }}
          onClick={() => router.push("/register")}
        >
          SignUp now
        </Typography>
      </Card>
    </Box>
  );
}
