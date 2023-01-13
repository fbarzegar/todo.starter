import { ReactNode } from "react";
import { Box, Typography, Card, Link, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function AuthLayout({
  children,
  title,
  button,
  link,
}: {
  children: ReactNode;
  title: string;
  button: string;
  link: string;
}) {
  const router = useRouter();
  return (
    <Box sx={{ width: "100%", backgroundColor: "#eeeeee" }}>
      <Box sx={{ width: "100%", height: "30vh", top: 0, position: "absolute", backgroundColor: "#90caf9" }} />
      <Box sx={{ width: "100%", position: "relative", py: "30px", textAlign: "center" }}>
        <Typography sx={{ cursor: "pointer" }} variant="h6" onClick={() => router.push("/")}>
          LOGO
        </Typography>
      </Box>
      <Card
        sx={{ width: { xs: "90vw", sm: "80vw", md: "40vw" }, height: "auto", p: 2, position: "relative", mx: "auto" }}
      >
        <Typography variant="h5" my={1} textAlign="center">
          {title}
        </Typography>
        {children}
      </Card>
      <Link href={link}>
        <Button
          sx={{
            width: "100%",
            fontSize: "16px",
            color: "#537366",
            textAlign: "center",
            textDecoration: "underLine",
            background: "none",
            mt: "30px",
            mx: "auto",
          }}
        >
          {button}
        </Button>
      </Link>
    </Box>
  );
}
