import { useState } from "react";
import { Button, TextField, Typography, Box, Input, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  username: Yup.string().required("please enter username"),
  password: Yup.string().required("please enter password"),
});

export default function LoginForm() {
  const [show, setShow] = useState(false);

  const handleSubmit = () => {};

  const { values, errors, touched, isSubmitting, isValid, handleBlur, setFieldValue } = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    initialValues: { username: "", password: "" },
    enableReinitialize: true,
  });

  return (
    <Box sx={{ width: "90%", mx: "auto", p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography sx={{ my: 1 }}>username</Typography>
          <TextField
            fullWidth
            name="username"
            type="name"
            value={values.username}
            error={Boolean(touched.username && errors.username)}
            helperText={errors.username}
            onBlur={handleBlur}
          />
          <Typography sx={{ my: 1 }}>password</Typography>
          <OutlinedInput
            type={show ? "text" : "password"}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)} edge="end">
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Button
          sx={{ width: "100%", my: 3, background: "#53a8b6", color: "#FFF", "&:hover": { background: "#53a8b6" } }}
          type="submit"
          disabled={!isValid}
        >
          Sing In
        </Button>
      </form>
    </Box>
  );
}
