import { Box, Button, Card, Checkbox, Divider, TextField, Typography, useMediaQuery } from "@mui/material";

const item = [
  { id: 1, text: "test1" },
  { id: 2, text: "test2" },
  { id: 3, text: "test1" },
];

export default function ToDoList() {
  const phone = useMediaQuery("(max-width:550px)");

  return (
    <Card sx={{ width: phone ? "350px" : "600px", height: "auto", m: "20px auto", p: 2 }}>
      <Typography sx={{ textAlign: "center", fontSize: phone ? "16px" : "20px", fontWeight: 700 }}>ToDoList</Typography>
      <Box sx={{ display: "flex", width: "100%", p: 2, justifyContent: "space-around" }}>
        <TextField style={{ width: "84%" }} />
        <Button sx={{ width: "14%", color: "#FFF", background: "#53a8b6", "&:hover": { background: "#53a8b6" } }}>
          Add
        </Button>
      </Box>
      <Card sx={{ background: "#f1fafb", width: "95%", mx: "auto" }}>
        {item.map((i, idx) => {
          return (
            <>
              <Box key={idx} sx={{ display: "flex", alignItems: "center", p: 1, justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <Checkbox />
                  <Typography>{i.text}</Typography>
                </Box>
                <Button>add comment</Button>
              </Box>
              <Divider />
            </>
          );
        })}
      </Card>
      <Box sx={{ width: "98%", display: "flex", pt: 3, justifyContent: "flex-end" }}>
        <Button sx={{ background: "#53a8b6", color: "#FFF", "&:hover": { background: "#53a8b6" } }}>remove all</Button>
      </Box>
    </Card>
  );
}
