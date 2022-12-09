import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { deleteTodos, todosType } from "../../../api/todos";
import ConfirmModal from "../../comment/confirmModal";
import EditTodoModal from "./editTodoModal";

export default function EditTodo({ todoId, text }: { todoId?: string; text: string }) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleDelete = async () => {
    try {
      if (!todoId) {
        throw new Error("No id provided");
      }
      await deleteTodos(todoId as string);
      setOpen(false);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <EditTodoModal text={text} id={todoId as string} open={open1} onClose={() => setOpen1(false)} />
      <ConfirmModal title={text} open={open} onClose={() => setOpen(false)} onConfirm={handleDelete} />
      <Box sx={{ width: "600px", mx: "auto" }}>
        <Typography sx={{ fontWeight: 600 }}>todos</Typography>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "cenetr", p: 2, justifyContent: "space-between" }}>
          <Typography>{text}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Button onClick={() => setOpen1(true)}>edit</Button>
            <Button onClick={() => setOpen(true)}>delete</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
