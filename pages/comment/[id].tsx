import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { addComment, CommentType, deleteComment } from "../../api/comment";
import DeleteModal from "../../component/deleteModal";

export default function Comment() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { data: comment } = useSWR<CommentType[]>(id ? `/comments/${id}` : null);

  const { getFieldProps, isSubmitting, isValid, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: { text: "" },
    async onSubmit(data: { text: string }, { setSubmitting }: any) {
      try {
        setSubmitting(true);
        await addComment(data as CommentType);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDelete = async () => {
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      await deleteComment(id as string);
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
      <DeleteModal open={open1} onClose={() => setOpen1(false)} onConfirm={handleDelete} />
      <Card sx={{ width: "70%", mx: "auto", my: 2 }}>
        <Typography variant="h6" textAlign="center" my={2}>
          comment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              width: "95%",
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              p: 1,
            }}
          >
            <TextField {...getFieldProps("text")} fullWidth size="small" />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              add
            </Button>
          </Box>
        </form>
        <Box sx={{ width: "95%", mx: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {comment?.map((i) => {
            return <Typography key={i.id}>{i?.text}</Typography>;
          })}
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
    </>
  );
}
