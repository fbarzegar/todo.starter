import { delete_, get, post, put } from ".";

export type commentType = {
  id: number;
  text?: string;
  createAt: string;
  todoId: number;
};

export const addComment = ( data?: any) => {
  return post(`/comments`, data);
};

export const editComment = (id: number, data?: commentType) => {
  return put(`/comments/${id}`, data);
};

export const deleteComment = (id: number, data: commentType) => {
  return delete_(`/comments/${id}`, data);
};
