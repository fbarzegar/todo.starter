import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SWRConfig } from "swr";
import DefaultLayout from "../layout/defaultLayout";
import { AppPropsWithLayout } from "../types/next";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
