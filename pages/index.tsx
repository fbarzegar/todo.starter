import Head from "next/head";
import TodoList from "../component/todoList";

export default function Index() {
  return (
    <>
      <Head>
        <title>Home </title>
      </Head>
      <TodoList />
    </>
  );
}
