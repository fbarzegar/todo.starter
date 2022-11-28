import { Box, Typography, Button, Avatar } from "@mui/material";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        background: "#e7eaf6",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          mx: "auto",
          p: 1.5,
        }}
      >
        <Typography sx={{ mx: "30px", fontSize: "20px", fontWeight: "600" }}>TodoList</Typography>
        <Button sx={{ width: "150px" }} onClick={() => router.push("/login")}>
          SignIn / SignUp
        </Button>
        {/* <Button>
        <Avatar />
        <Typography>fb</Typography>
      </Button> */}
      </Box>
    </Box>
  );
}
