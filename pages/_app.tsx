import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import DefaultLayout from "../layout/default";

export default function App({ Component, pageProps }: AppProps) {
// const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <>
      <Component {...pageProps} />
      <CssBaseline />
    </>
  );
}
