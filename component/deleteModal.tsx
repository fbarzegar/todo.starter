import { Box, Dialog, Typography, Button } from "@mui/material";

export default function DeleteModal({
  open,
  title,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box width="300px" padding={2} bgcolor="#FFFFFF" borderRadius="15px">
        <Typography
          fontSize="16px"
          fontWeight="500"
          color="#2E3D50"
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          Are you sure?
        </Typography>
        {title && (
          <Typography
            sx={{ width: "85%", wordBreak: "break-all", mx: "auto", overflow: "hidden", textAlign: "center" }}
            fontSize="16px"
            color="#2E3D50"
          >
            {title}
          </Typography>
        )}
        <Box mx="auto" my={2} width={210} display="flex" alignItems="center" justifyContent="space-between">
          <Button variant="contained" onClick={onConfirm} sx={{ px: 4 }}>
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ px: 4 }}>
            No
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
