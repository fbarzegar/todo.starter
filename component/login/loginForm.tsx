import { useState } from "react";
import { Button, TextField, Typography, Box, OutlinedInput, InputAdornment, IconButton, Input } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";

import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../features/user/hooks";
import { loginThunk } from "../../features/user/userSlice";

const schema = Yup.object().shape({
  username: Yup.string().required("please enter username"),
  password: Yup.string().required("please enter password"),
});

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFormSubmit = async (
    data: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>
  ) => {
    try {
      setSubmitting(true);
      const res = await dispatch(loginThunk({ username: data.username, password: data.password }));
      unwrapResult(res);

      router.push("/");
    } catch (error: any) {
      setError("username or password incrrocet");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, isValid, handleBlur, handleSubmit, handleChange } = useFormik({
    onSubmit: handleFormSubmit,
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
            value={values?.username}
            onChange={handleChange("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={errors.username}
          />
          <Typography sx={{ my: 1 }}>password</Typography>
          <Input
            value={values?.password}
            onChange={handleChange("password")}
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
          sx={{
            width: "100%",
            my: 3,
            background: "#53a8b6",
            color: "#FFF",
            "&:hover": { background: "#53a8b6" },
            "&:disabled": { background: "#eeeeee", color: "#53a8b6" },
          }}
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Sing In
        </Button>
        {error && (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "red" }}>{error}</Typography>
          </Box>
        )}
      </form>
    </Box>
  );
}
