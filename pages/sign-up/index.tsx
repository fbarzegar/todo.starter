import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";

import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { getMeThunk, registerThunk } from "../../features/user/userSlice";

import AuthLayout from "../../layout/authLayout";
import { useAppDispatch } from "../../store";
import { NextPageWithLayout } from "../../types/next";

const schema = Yup.object().shape({});

const SignUp: NextPageWithLayout = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { errors, getFieldProps, handleSubmit, isSubmitting, isValid } = useFormik({
    enableReinitialize: true,
    validationSchema: schema,
    initialValues: { username: "", password: "" },
    async onSubmit(data: { username: string; password: string }, { setSubmitting }: any) {
      try {
        setSubmitting(true);
        await dispatch(registerThunk({ username: data.username, password: data.password })).unwrap();
        dispatch(getMeThunk());
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>TodoList | SignUp</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Typography>username :</Typography>
        <TextField type="name" {...getFieldProps("username")} fullWidth size="small" />
        <Typography>password :</Typography>
        <TextField
          {...getFieldProps("password")}
          type={show ? "text" : "password"}
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
          create account
        </Button>
      </form>
    </>
  );
};

SignUp.getLayout = (p) => (
  <AuthLayout title="SignUp" button="Already have an account? Sign In" link="/login">
    {p}
  </AuthLayout>
);

export default SignUp;
