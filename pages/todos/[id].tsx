import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit } from "@mui/icons-material";
import { Card, Box, Typography, IconButton } from "@mui/material";
import Comment from "../comment/[id]";
import { deleteTodo, TodoType } from "../../api/todos";
import useSWR from "swr";
import EditTodoModal from "../../component/editModal";
import DeleteModal from "../../component/deleteModal";
import { toast } from "react-toastify";

export default function Todos() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data: todo } = useSWR<TodoType>(id ? `/todos/${id}` : null);

  const handleDelete = async () => {
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      await deleteTodo(id as string);
      setOpen1(false);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <DeleteModal title={todo?.text} open={open1} onClose={() => setOpen1(false)} onConfirm={handleDelete} />
      <EditTodoModal open={open} onClose={() => setOpen(false)} id={id as string} />
      <Card sx={{ width: "70%", m: "20px auto", p: 1 }}>
        <Box sx={{ width: "95%", mx: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>{todo?.text}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton onClick={() => setOpen(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => setOpen1(true)}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <Comment />
    </>
  );
}
