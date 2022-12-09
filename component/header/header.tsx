import { useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import LogoutModal from "../login/logoutModal";
import { useUser } from "../../features/user/userSlice";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const user = useUser();

  return (
    <>
      <LogoutModal open={open} handleClose={() => setOpen(false)} />
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
          <Typography sx={{ mx: "30px", fontSize: "20px", fontWeight: "600" }}>ToDoList</Typography>
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button>
                <Avatar style={{ width: "25px", height: "25px" }} />
                <Typography sx={{ fontSize: "12px", mx: 1 }}>{user?.username}</Typography>
              </Button>
              <Button sx={{ color: "#E33C25" }} onClick={() => setOpen(true)}>
                logout
              </Button>
            </Box>
          ) : (
            <Button sx={{ width: "150px" }} onClick={() => router.push("/login")}>
              SignIn / SignUp
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
