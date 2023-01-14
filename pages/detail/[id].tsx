import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>todoList | Detail </title>
      </Head>
      <Card sx={{ width: "70%", mx: "auto", my: 2 }}>
        <Box
          sx={{
            widty: "90%",
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            alignItems: "center",
          }}
        >
          <Typography>work</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton>
              <Delete />
            </IconButton>
            <IconButton>
              <Edit />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <Card sx={{ width: "70%", mx: "auto", my: 2 }}>
        <Typography variant="h6" textAlign="center" my={2}>
          comment
        </Typography>
        <Box
          sx={{
            widty: "90%",
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            alignItems: "center",
          }}
        >
          <Typography>work</Typography>
        </Box>
      </Card>
    </>
  );
}
