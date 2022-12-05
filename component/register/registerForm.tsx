import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormikHelpers, useFormik } from "formik";

import * as Yup from "yup";
import { useAppDispatch } from "../../features/user/hooks";
import { getMeThunk, registerThunk } from "../../features/user/userSlice";
import { useCheckUsername } from "../../utils/hooks";

const schema = Yup.object().shape({
  username: Yup.string().required("please enter username"),
  password: Yup.string().required("please enter password"),
});

export default function RegisterForm() {
  const [show, setShow] = useState(false);
  const [enterUsername, setEnterUsername] = useState();
  const { usernameStatus } = useCheckUsername(enterUsername);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFormSubmit = async (
    data: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>
  ) => {
    try {
      setSubmitting(true);
      const res = await dispatch(registerThunk({ username: data.username, password: data.password }));
      unwrapResult(res);
      await dispatch(getMeThunk());
      router.push("/");
    } catch (error) {
      toast.error("Your registration was not successful");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, isValid, touched, isSubmitting, handleSubmit, handleChange } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
    validationSchema: schema,
  });
  return (
    <Box sx={{ width: "90%", mx: "auto", p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography sx={{ my: 1 }}>username</Typography>
          <TextField
            fullWidth
            type="name"
            error={Boolean(touched.username && errors.username)}
            helperText={errors.username}
            value={values.username}
            onChange={handleChange("username")}
          />
          {usernameStatus === "checking" && <LinearProgress />}
          <>
            {touched.username && usernameStatus === "exist" && (
              <Box sx={{ color: "red", fontSize: "10px", m: 1 }}>
                <Box>{usernameStatus === "exist" ? "This username already exist" : errors.username}</Box>
              </Box>
            )}
          </>
          <Typography sx={{ my: 1 }}>password</Typography>
          <Input
            fullWidth
            type={show ? "text" : "password"}
            error={Boolean(touched.password && errors.password)}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {/* <TextField
            type={show ? "text" : "password"}
            error={Boolean(touched.password && errors.password)}
            helperText={errors.password}
            {...getFieldProps}
            fullWidth
          /> */}
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
