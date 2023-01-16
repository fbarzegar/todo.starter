import { Box, Button, Card, Typography, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import useSWR from "swr";
import { addTodo, TodoType } from "../api/todos";

export default function TodoList() {
  const router = useRouter();
  const { data } = useSWR<TodoType[]>("/todos");

  const { getFieldProps, isSubmitting, isValid, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: { text: "" },
    async onSubmit(data: { text: string }, { setSubmitting }: any) {
      try {
        setSubmitting(true);
        await addTodo(data as TodoType);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Card sx={{ width: "70%", m: "20px auto" }}>
        <Typography variant="h6" textAlign="center" py={2}>
          TodoList
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
        <Box sx={{ width: "90%", mx: "auto" }}>
          {data?.map((i) => {
            return (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }} key={i.id}>
                <FormControlLabel style={{ textDecoration: "none" }} control={<Checkbox />} label={i.text} />
                <Button onClick={() => router.push(`/todos/${i.id}`)}>detail</Button>
              </Box>
            );
          })}
        </Box>
      </Card>
    </>
  );
}
