import { Box, Dialog, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { toast } from "react-toastify";
import { editComment } from "../../api/comment";

const schema = Yup.object({
  text: Yup.string().required("please enter opnion"),
});

export default function EditModal({
  open,
  onClose,
  commentId,
  text,
}: {
  open: boolean;
  onClose: () => void;
  commentId: string;
  text?: string;
}) {
  const handleFormSubmit = async (data: { text: string }, { setSubmitting }: FormikHelpers<{ text: string }>) => {
    try {
      if (!commentId) {
        throw new Error("No id provided");
      }
      setSubmitting(true);
      await editComment(commentId as string, { text: data.text });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, isSubmitting, isValid, handleSubmit, handleChange } = useFormik({
    onSubmit: handleFormSubmit,
    validationSchema: schema,
    initialValues: { text: "" },
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <Box width="300px" padding={2} bgcolor="#FFFFFF" borderRadius="15px">
        <Typography sx={{ fontSize: "16px", fontWeigth: 700, p: 1 }}>Edit :</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={text}
            onChange={handleChange("text")}
            error={Boolean(errors?.text)}
            helperText={errors?.text}
            type="text"
            fullWidth
          />
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
