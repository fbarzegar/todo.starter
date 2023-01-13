import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", height: "60px", alignItems: "center", background: "#EEEEEE" }}>
      <Box
        sx={{
          width: "85%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          py: 1.5,
          alignItems: "center",
        }}
      >
        <Typography variant="h6">LOGO</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <Typography sx={{ cursor: "pointer" }} mx={2}>
            home
          </Typography>
          <Typography sx={{ cursor: "pointer" }} mx={2}>
            about
          </Typography>
          <Typography sx={{ cursor: "pointer" }} mx={2}>
            blog
          </Typography>
          <Button sx={{ cursor: "pointer", mx: 2 }} onClick={() => router.push("/login")}>
            login/signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
