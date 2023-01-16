import { Box, Dialog, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { editTodo } from "../api/todos";

const schema = Yup.object({
  text: Yup.string().required("please enter opnion"),
});

export default function EditTodoModal({ open, onClose, id }: { open: boolean; onClose: () => void; id: string }) {
  const { isSubmitting, isValid, handleSubmit, getFieldProps } = useFormik({
    validationSchema: schema,
    initialValues: { text: "" },
    enableReinitialize: true,
    async onSubmit(data: { text: string }, { setSubmitting }: any) {
      try {
        if (!id) {
          throw new Error("No id provided");
        }
        setSubmitting(true);
        await editTodo(id as string, { text: data?.text });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <Box width="300px" padding={2} bgcolor="#FFFFFF" borderRadius="15px">
        <Typography sx={{ fontSize: "16px", fontWeigth: 700, p: 1 }}>Edit :</Typography>
        <form onSubmit={handleSubmit}>
          <TextField {...getFieldProps("text")} type="text" fullWidth size="small" />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", p: 2 }}>
            <Button sx={{ width: "100px", px: 4 }} variant="outlined" onClick={onClose}>
              cancel
            </Button>
            <Button
              sx={{
                width: "100px",
                color: "#FFF",
                background: "#53a8b6",
                "&:hover": { background: "#53a8b6" },
                "&:disabled": { background: "#eeeeee", color: "#53a8b6" },
              }}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              edit
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
}
