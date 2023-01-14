import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SWRConfig } from "swr";
import { get } from "../api";
import DefaultLayout from "../layout/defaultLayout";
import store from "../store";
import { AppPropsWithLayout } from "../types/next";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <Provider store={store}>
        <SWRConfig value={{ fetcher: get, errorRetryCount: 3 }}>
          <ToastContainer />
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
      </Provider>
    </>
  );
}
