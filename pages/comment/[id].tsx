import { Box } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

import CommentList from "../../component/comment/commentList";
import { commentType } from "../../api/comment";
import AddComment from "../../component/comment/addComment";

export default function Comment({ todoId }: { todoId: string }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: comments } = useSWR<commentType>(`/comments/${id}`);

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      {/* {comments?.todoId === todoId && <CommentList text={comments?.text} commentId={id as string} />} */}
      <CommentList text={comments?.text as string} commentId={id as string} />
      <AddComment />
    </Box>
  );
}
