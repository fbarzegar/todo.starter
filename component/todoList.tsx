import { Box, Button, Card, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { TodoType } from "../api/todos";

export default function TodoList() {
  const router = useRouter();
  const { data } = useSWR<TodoType[]>("/todos");

  return (
    <>
      <Card sx={{ width: "70%", m: "20px auto" }}>
        <Typography variant="h6" textAlign="center" py={2}>
          TodoList
        </Typography>
        <Button>add todoList</Button>
        <Box sx={{ width: "90%", mx: "auto" }}>
          {data?.map((i, idx) => {
            return (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }} key={i._id}>
                <FormControlLabel style={{ textDecoration: "none" }} control={<Checkbox />} label={i.text} />
                <Button onClick={() => router.push(`/todos/${i._id}`)}>detail</Button>
              </Box>
            );
          })}
        </Box>
      </Card>
    </>
  );
}
