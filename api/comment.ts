import { delete_, get, post, put } from ".";

export type commentType = {
  id:string | number;
  text: string;
  createAt: string;
  todoId: number | string;
};

export const addComment = (data?: any) => {
  return post(`/comments`, data);
};

export const editComment = (id: number | string, data: { text: string }) => {
  return put(`/comments/${id}`, data);
};

export const deleteComment = (id: number | string, data?: { text: string }) => {
  return delete_(`/comments/${id}`, data);
};
