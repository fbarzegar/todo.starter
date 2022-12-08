import { delete_, get, post, put } from ".";

export type todosType = {
  id?: number | string;
  text?: string;
  done?: boolean;
  createAt?: string;
  userId?: number;
};

export const addTodos = (data?: any) => {
  return post(`/todos`, data);
};

export const editTodos = (id?: number | string, data?: todosType) => {
  return put(`/todos/${id}`, data);
};

export const deleteTodos = (id: number, data: todosType) => {
  return delete_(`/todos/${id}`, data);
};
