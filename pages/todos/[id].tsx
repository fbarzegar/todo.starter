import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { todosType } from "../../api/todos";
import EditTodo from "../../component/home/component/editTodo";
import Comment from "../comment/[id]";

export default function Todos() {
  const router = useRouter();
  const { id } = router.query;
  const { data: todos } = useSWR<todosType>(`/todos/${id}`);

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Button sx={{ p: 2 }} onClick={() => router.push("/")}>
        <ArrowBackIos />
        back to home page
      </Button>
      <EditTodo todoId={id as string} text={todos?.text as string} />
      <Comment todoId={id as string} />
    </Box>
  );
}
