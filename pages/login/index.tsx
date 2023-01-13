import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import * as Yup from "yup";

import AuthLayout from "../../layout/authLayout";
import { NextPageWithLayout } from "../../types/next";

const schema = Yup.object().shape({});

const Login: NextPageWithLayout = () => {
  const { errors, getFieldProps, handleSubmit } = useFormik({
    enableReinitialize: true,
    validationSchema: schema,
    initialValues: {},
    async onSubmit(data: any) {},
  });

  return (
    <>
      <Head>
        <title>TodoList | Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Typography>username :</Typography>
        <TextField fullWidth size="small" />
        <Typography>password :</Typography>
        <TextField fullWidth size="small" />
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
