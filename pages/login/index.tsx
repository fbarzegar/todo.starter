import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { getMeThunk, loginThunk } from "../../features/user/userSlice";

import AuthLayout from "../../layout/authLayout";
import { useAppDispatch } from "../../store";
import { NextPageWithLayout } from "../../types/next";

const schema = Yup.object().shape({});

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>();

  const { errors, getFieldProps, handleSubmit, isValid, isSubmitting } = useFormik({
    enableReinitialize: true,
    validationSchema: schema,
    initialValues: { username: "", password: "" },
    async onSubmit(data: { username: string; password: string }, { setSubmitting }: any) {
      try {
        setSubmitting(true);
        await dispatch(loginThunk({ username: data.username, password: data.password })).unwrap();
        dispatch(getMeThunk());
        router.push("/");
      } catch (error) {
        console.log(error);
        setError("username or password incrroct");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>TodoList | Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Typography>username :</Typography>
        <TextField {...getFieldProps("username")} fullWidth size="small" />
        <Typography>password :</Typography>
        <TextField
          type={show ? "text" : "password"}
          {...getFieldProps("password")}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)}>{show ? <Visibility /> : <VisibilityOff />}</IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Box textAlign="center">
            <Typography color="red">{error}</Typography>
          </Box>
        )}
        <Button
          sx={{
            width: "100%",
            background: "#90caf9",
            color: "#FFF",
            textAlign: "center",
            my: 2,
            "&:hover": { background: "#90caf9" },
          }}
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          login
        </Button>
      </form>
    </>
  );
};

Login.getLayout = (p) => (
  <AuthLayout title="login" button="Not signed up? Create an account" link="/sign-up">
    {p}
  </AuthLayout>
);

export default Login;
