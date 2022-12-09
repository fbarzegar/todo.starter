import { Box, Button, Card, Checkbox, Divider, Typography, useMediaQuery, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";

import useSWR from "swr";

import { todosType } from "../../api/todos";
import AddToDoList from "./component/addToDoList";

export default function ToDoList() {
  const phone = useMediaQuery("(max-width:550px)");

  const router = useRouter();
  const { data: todos } = useSWR<todosType | any>(`/todos`);

  return (
    <>
      <Card sx={{ width: "70%", height: "auto", m: "20px auto", p: 2 }}>
        <Typography sx={{ textAlign: "center", fontSize: phone ? "16px" : "20px", fontWeight: 700 }}>
          ToDoList
        </Typography>
        <AddToDoList />
        <Card sx={{ background: "#f1fafb", width: "95%", mx: "auto" }}>
          {todos?.map((i: any) => {
            return (
              <Box key={i?.id}>
                <Box sx={{ display: "flex", alignItems: "center", p: 1, justifyContent: "space-between" }}>
                  <FormControlLabel style={{ textDecoration: "none" }} control={<Checkbox />} label={i.text} />
                  <Button onClick={() => router.push(`/todos/${i.id}`)}>detail </Button>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Card>
      </Card>
    </>
  );
}
