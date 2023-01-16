import { delete_, post, patch } from ".";

export type CommentType = {
  id: number;
  text: string;
  createAt: string;
  todoId: number;
};

export const addComment = (data: CommentType) => {
  return post("/comments", data);
};

export const editComment = (id: string, data: CommentType) => {
  return patch(`/comments/${id}`, data);
};

export const deleteComment = (id: string) => {
  return delete_(`/comments/${id}`);
};
