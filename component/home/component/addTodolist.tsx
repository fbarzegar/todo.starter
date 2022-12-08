import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { toast } from "react-toastify";

import { addTodos } from "../../../api/todos";

const schema = Yup.object({
  text: Yup.string().required("please enter opnion"),
});

export default function AddToDoList() {
  const handleFormSubmit = async (data: { text: string }, { setSubmitting }: FormikHelpers<{ text: string }>) => {
    try {
      setSubmitting(true);
      await addTodos({ text: data?.text });
    } catch (error) {
      toast.error("invalid text");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, isValid, handleSubmit, handleChange } = useFormik({
    onSubmit: handleFormSubmit,
    validationSchema: schema,
    initialValues: { text: "" },
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", width: "100%", p: 2, justifyContent: "space-around" }}>
          <TextField
            style={{ width: "84%" }}
            value={values.text}
            onChange={handleChange("text")}
            error={Boolean(touched.text || errors.text)}
            helperText={errors.text}
          />
          <Button
            sx={{
              width: "14%",
              color: "#FFF",
              background: "#53a8b6",
              "&:hover": { background: "#53a8b6" },
              "&:disabled": { background: "#eeeeee", color: "#53a8b6" },
            }}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Add
          </Button>
        </Box>
      </form>
    </>
  );
}
