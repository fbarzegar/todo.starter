import { useState } from "react";
import { Box, Button, Card, Checkbox, Divider, TextField, Typography, useMediaQuery } from "@mui/material";
import { CheckBox, Comment, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import useSWR from "swr";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";

import { editTodos, todosType } from "../../api/todos";
import AddToDoList from "./component/addTodolist";
import CommentList from "./component/commentList";
import { toast } from "react-toastify";

const item = [
  { id: 1, text: "test1" },
  { id: 2, text: "test2" },
  { id: 3, text: "test1" },
];

const schema = Yup.object({
  text: Yup.string().required("please enter opnion"),
});

export default function ToDoList() {
  const phone = useMediaQuery("(max-width:550px)");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const handleFormSubmit = async (data: { text: string }, { setSubmitting }: FormikHelpers<{ text: string }>) => {
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      setSubmitting(true);
      editTodos(id as string, { text: data?.text });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (data: { text: string }) => {
    try {
      if (checked) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, isSubmitting, isValid, handleSubmit, getFieldProps } = useFormik({
    onSubmit: handleFormSubmit,
    validationSchema: schema,
    initialValues: { text: "" },
    enableReinitialize: true,
  });

  const { data: todos } = useSWR<{ todos: todosType[] }>(`/todos`);

  return (
    <>
      <CommentList open={open} onClose={() => setOpen(false)} />
      <Card sx={{ width: "70%", height: "auto", m: "20px auto", p: 2 }}>
        <Typography sx={{ textAlign: "center", fontSize: phone ? "16px" : "20px", fontWeight: 700 }}>
          ToDoList
        </Typography>
        <AddToDoList />
        <form onSubmit={handleSubmit}>
          <Card sx={{ background: "#f1fafb", width: "95%", mx: "auto" }}>
            {item.map((i: any) => {
              return (
                <Box key={i?.id}>
                  <Box sx={{ display: "flex", alignItems: "center", p: 1, justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                      {edit ? (
                        <TextField
                          type="text"
                          {...getFieldProps("text")}
                          error={Boolean(touched.text || errors.text)}
                          fullWidth
                        />
                      ) : (
                        <>
                          {checked ? (
                            <Box>
                              <Checkbox onClick={() => setChecked(true)} />
                              <Typography sx={{ textDecoration: "line-through" }}>{i.text}</Typography>
                            </Box>
                          ) : (
                            <Box>
                              <Checkbox onClick={() => setChecked(false)} />
                              <Typography sx={{ textDecoration: "none" }}>{i.text}</Typography>
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                    {edit ? (
                      <Button
                        sx={{
                          background: "#53a8b6",
                          color: "#FFF",
                          "&:hover": { background: "#53a8b6" },
                          "&:disabled": { background: "#eeeeee", color: "#53a8b6" },
                        }}
                        type="submit"
                        disabled={isValid || isSubmitting}
                      >
                        send
                      </Button>
                    ) : (
                      <Button onClick={() => setEdit(true)}>
                        <Edit />
                      </Button>
                    )}
                    <Button onClick={() => setOpen(true)}>Comment </Button>
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          </Card>
          <Box sx={{ width: "98%", display: "flex", pt: 3, justifyContent: "flex-end" }}>
            <Button sx={{ background: "#53a8b6", color: "#FFF", "&:hover": { background: "#53a8b6" } }}>
              remove all
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
}
