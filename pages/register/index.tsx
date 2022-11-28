import { Box, Card, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import RegisterForm from "../../component/register/registerForm";

export default function Register() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", py: 4, background: "#eeeeee", height: "100vh" }}>
      <Card sx={{ width: "450px", height: "550px", mx: "auto" }}>
        <Box
          sx={{
            width: "100%",
            height: "80px",
            background: "#83cee0",
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
            p: 2,
            alignItems: "center",
          }}
        >
          <ArrowBackIosIcon style={{ color: "#FFF", cursor: "pointer" }} onClick={() => router.push("/")} />
          <Typography sx={{ textAlign: "center", color: "#FFF", fontSize: "30px" }}>Sign Up</Typography>
          <Box></Box>
        </Box>
        <RegisterForm />
        <Typography sx={{ color: "#000", textAlign: "center" }}>Did you already register?</Typography>
        <Typography
          sx={{ color: "#83cee0", fontWeight: "600", textAlign: "center", my: 1, cursor: "pointer" }}
          onClick={() => router.push("/login")}
        >
          SignIn
        </Typography>
      </Card>
    </Box>
  );
}
