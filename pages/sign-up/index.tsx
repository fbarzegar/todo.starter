import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Head } from "next/document";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { registerThunk } from "../../features/user/userSlice";

import AuthLayout from "../../layout/authLayout";
import { useAppDispatch } from "../../store";
import { NextPageWithLayout } from "../../types/next";

const schema = Yup.object().shape({});

const SignUp: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { errors, getFieldProps, handleSubmit } = useFormik({
    enableReinitialize: true,
    validationSchema: schema,
    initialValues: { username: "", password: "" },
    async onSubmit(data: { username: string; password: string }, { setSubmitting }: any) {
      try {
        setSubmitting(true);
        await dispatch(registerThunk({ username: data.username, password: data.password })).unwrap();
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
        <TextField {...getFieldProps("username")} fullWidth size="small" />
        <Typography>password :</Typography>
        <TextField {...getFieldProps("password")} fullWidth size="small" />
        <Button
          sx={{
            width: "100%",
            background: "#90caf9",
            color: "#FFF",
            textAlign: "center",
            my: 2,
            "&:hover": { background: "#90caf9" },
          }}
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
