import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import ToDoList from "../../component/home/toDoList";
import { useUser } from "../../features/user/userSlice";

export default function Home() {
  const phone = useMediaQuery("(max-width:550px)");
  const router = useRouter();
  const user = useUser();

  return (
    <>
      {user ? (
        <ToDoList />
      ) : (
        <Box
          sx={{
            width: "40%",
            height: "120px",
            m: "50px auto",
            border: "2px solid #53a8b6",
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: phone ? "14px" : "18px", pt: 3 }}>Please login to your account first</Typography>
          <Button
            sx={{
              width: "100px",
              textAlign: "center",
              background: "#53a8b6",
              color: "#FFF",
              my: 2,
              "&:hover": { background: "#53a8b6" },
            }}
            onClick={() => router.push("/login")}
          >
            login
          </Button>
        </Box>
      )}
    </>
  );
}
