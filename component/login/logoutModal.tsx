import { Box, Button, Dialog, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

import { useAppDispatch } from "../../features/user/hooks";
import { logout } from "../../features/user/userSlice";

export default function LogoutModal({ open, handleClose }: { open: boolean; handleClose: () => void }) {
  const phone = useMediaQuery("(max-width:550px)");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => router.push("/login"), 50);
  };

  return (
    <Dialog dir="rtl" open={open} onClose={handleClose}>
      <Box sx={{ width: phone ? "312px" : "400px", height: phone ? "180px" : "204px" }}>
        <Typography sx={{ fontSize: phone ? "16px" : "20px", textAlign: "center", mt: "10px", mb: "20px" }}>
          میخواهید از حساب کاربری خود خارج شوید؟
        </Typography>
        <Box
          sx={{
            width: "93%",
            m: "20px auto",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              width: phone ? "195px" : "148px",
              height: "48px",
              background: "#E33C25",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: phone ? "12px" : "14px",
              "&:hover": {
                background: "#E33C25",
              },
              justifyContent: "center",
              ml: 1,
            }}
            onClick={handleLogout}
          >
            خروج از حساب
          </Button>
          <Button
            sx={{
              width: phone ? "195px" : "148px",
              height: "48px",
              background: "#FFFFFF",
              border: "0.5px solid #474859",
              borderRadius: "8px",
              color: "#474859",
              fontSize: phone ? "12px" : "14px",
              "&:hover": {
                background: "#FFFFFF",
              },
              justifyContent: "center",
            }}
            onClick={handleClose}
          >
            انصراف
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
