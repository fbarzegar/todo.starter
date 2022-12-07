import { Box, Button, Dialog, TextField, Typography, useMediaQuery } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
import { addComment } from "../../../api/comment";
import { useUser } from "../../../features/user/userSlice";

const schema = Yup.object().shape({
  username: Yup.string().required(),
  text: Yup.string().required("please enter your opinion"),
});

export default function AddComment() {
  const phone = useMediaQuery("(max-width:550px)");

  const user = useUser();
  const handleFormSubmit = async (data: { text: string }, { setSubmitting }: FormikHelpers<{ text: string }>) => {
    try {
      setSubmitting(true);
      addComment({ text: data?.text });
    } catch (error) {
      toast.error("your comment not sent!");
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
      <Box sx={{ height: "auto", p: 2 }}>
        <Typography sx={{ px: 3, fontSize: phone ? "16px" : "20px", fontWeight: 700 }}>Write your opinion</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: "10px", px: 3 }}>
            <Typography sx={{ my: "15px", fontSize: phone ? "14px" : "16px" }}>your text </Typography>
            <TextField
              value={values.text}
              onChange={handleChange("text")}
              error={Boolean(touched.text && errors.text)}
              helperText={errors.text}
              multiline
              rows={4}
              fullWidth
              type="text"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{
                  width: "300px",
                  background: "#53a8b6",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  mt: "20px",
                  "&:hover": {
                    backgroundColor: "#53a8b6",
                  },
                  "&:disabled": {
                    background: "#eeeeee",
                    color: "#53a8b6",
                  },
                }}
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                send
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
