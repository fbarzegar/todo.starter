import { Box, Button, Card, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/router";

const item = [
  { id: 1, title: "work" },
  { id: 2, title: "work" },
  { id: 3, title: "work" },
];

export default function TodoList() {
  const router = useRouter();

  return (
    <>
      <Card sx={{ width: "70%", m: "20px auto" }}>
        <Typography variant="h6" textAlign="center" py={2}>
          TodoList
        </Typography>
        <Button>add todoList</Button>
        <Box sx={{ width: "90%", mx: "auto" }}>
          {item.map((i, idx) => {
            return (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }} key={idx}>
                <FormControlLabel style={{ textDecoration: "none" }} control={<Checkbox />} label={i.title} />
                <Button onClick={() => router.push("/detail/1")}>detail</Button>
              </Box>
            );
          })}
        </Box>
      </Card>
    </>
  );
}
