import { Box, Card, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import RegisterForm from "../../component/register/registerForm";
import Head from "next/head";

export default function Register() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
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
            <Typography sx={{ textAlign: "center", color: "#FFF", fontSize: "30px" }}>Sign Up</Typography>
            <Box></Box>
          </Box>
          <RegisterForm />
          <Typography sx={{ color: "#000", textAlign: "center", mt: 3 }}>Did you already register?</Typography>
          <Typography
            sx={{ color: "#53a8b6", fontWeight: "600", textAlign: "center", my: 1, cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            Sign In
          </Typography>
        </Card>
      </Box>
    </>
  );
}
