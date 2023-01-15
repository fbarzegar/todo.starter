import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { TodoType } from "../../api/todos";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR<TodoType>(`/todos/${id}`);

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
          <Typography>{data?.text}</Typography>
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
