import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { toast } from "react-toastify";
import useSWR from "swr";

import { commentType, deleteComment } from "../../api/comment";
import AddComment from "./addComment";
import ConfirmModal from "./confirmModal";
import EditModal from "./editModal";

export default function CommentList({ commentId ,text}: { commentId: string; text:string }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const { data: comments } = useSWR<commentType | any>(`/comments`);

  const handleDelete = async () => {
    try {
      if (!commentId) {
        throw new Error("no id provided");
      }
      await deleteComment(commentId as string);
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("not deleted");
      console.log(error);
    }
  };

  return (
    <>
      <EditModal text={text} commentId={commentId} open={edit} onClose={() => setEdit(false)} />
      <ConfirmModal title={text} open={open} onClose={() => setOpen(false)} onConfirm={handleDelete} />
      <Box sx={{ width: "600px", mx: "auto", p: 2 }}>
        <Typography sx={{ fontWeight: 600 }}>comments</Typography>
        <Divider />
        {comments?.map((i: any) => {
          return (
            <Box key={i.id} sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
              <Typography>{i.text}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button type="submit" onClick={() => setEdit(true)}>
                  <Edit />
                </Button>

                <Button type="submit" onClick={() => setOpen(true)}>
                  <Delete />
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>      
    </>
  );
}
