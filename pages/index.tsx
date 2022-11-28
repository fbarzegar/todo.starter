import Head from "next/head";
import Header from "../component/header/header";
import Home from "./home";

export default function Index() {
  return (
    <>
      <Head>
        <title>ToDoList </title>
      </Head>
      <Header />
      <Home />
    </>
  );
}
