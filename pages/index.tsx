import { Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import TodoList from "../component/todoList";
import { useUser } from "../features/user/hooks";

export default function Index() {
  const user = useUser();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home </title>
      </Head>
      {/* {user ? (
        <TodoList />
      ) : (
        <Button sx={{ width: "100%", m: "20px auto" }} onClick={() => router.push("/login")}>
          go to login page
        </Button>
      )} */}
       <TodoList />
    </>
  );
}
