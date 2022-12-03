import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";

import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { unwrapResult } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../features/user/hooks";
import { registerThunk } from "../../features/user/userSlice";

const schema = Yup.object().shape({
  username: Yup.string().required("please enter username"),
  password: Yup.string().required("please enter password"),
});

export default function RegisterForm() {
  const [show, setShow] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = async (
    data: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>
  ) => {
    try {
      setSubmitting(true);
      const res = await dispatch(registerThunk({ username: data.username, password: data.password }));
      unwrapResult(res);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, isValid, touched, isSubmitting, handleBlur } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validationSchema: schema,
  });
  return (
    <Box sx={{ width: "90%", mx: "auto", p: 2 }}>
      <form onSubmit={()=>handleSubmit}>
        <Box>
          <Typography sx={{ my: 1 }}>username</Typography>
          <TextField
            fullWidth
            type="name"
            value={values.username}
            error={Boolean(touched.username && errors.username)}
            helperText={errors.username}
            onBlur={handleBlur}
          />
          <Typography sx={{ my: 1 }}>password</Typography>
          <OutlinedInput
            fullWidth
            type={show ? "text" : "password"}
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            // helperText={errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          sx={{
            width: "100%",
            my: 3,
            background: "#53a8b6",
            color: "#FFF",
            "&:hover": { background: "#53a8b6" },
            "&:disabled": { background: "#eeeeee", color: "#53a8b6" },
          }}
        >
          Sing Up
        </Button>
      </form>
    </Box>
  );
}
