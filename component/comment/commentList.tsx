import { useState } from "react";
import { Close, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Dialog, Divider, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import useSWR from "swr";
import { useFormik } from "formik";
import * as Yup from "yup";

import { commentType, deleteComment, editComment } from "../../api/comment";
import AddComment from "./addComment";

const item = [
  { id: 1, text: "important task" },
  { id: 2, text: "important task" },
  { id: 3, text: "important task" },
];

const schema = Yup.object().shape({
  text: Yup.string().required("invalid text"),
});

export default function CommentList({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: comment } = useSWR<{ comment: commentType[] }>(`/comments`);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleFormSubmit = () => {};

  const handleEdit = async (data: { text: string }) => {
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      setEdit(true);
      editComment(id as string, { text: data.text });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setEdit(false);
      console.log(error);
    }
  };

  const handleDelete = async (data: { text: string }) => {
    try {
      setLoading(true);
      deleteComment(id as string, { text: data.text });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const { values, errors, getFieldProps, isSubmitting, isValid, handleSubmit, touched } = useFormik({
    onSubmit: handleFormSubmit,
    validationSchema: schema,
    initialValues: { text: "" },
    enableReinitialize: true,
  });

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Close onClick={onClose} style={{ cursor: "pointer", margin: 2 }} />
        <Box sx={{ width: "600px", mx: "auto", p: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>comments</Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            {item?.map((i) => {
              return (
                <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }} key={i.id}>
                  {edit ? (
                    <TextField {...getFieldProps("text")} error={Boolean(touched.text || errors.text)} />
                  ) : (
                    <Typography>{i.text}</Typography>
                  )}
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    {edit ? (
                      <Button type="submit" onClick={() => handleEdit}>
                        send
                      </Button>
                    ) : (
                      <Button onClick={() => setEdit(true)}>
                        <Edit />
                      </Button>
                    )}
                    <Button type="submit" onClick={() => handleDelete}>
                      <Delete />
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </form>
        </Box>
        <AddComment />
      </Dialog>
    </>
  );
}
