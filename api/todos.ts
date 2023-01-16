import { delete_, patch, post } from ".";

export type TodoType = {
  id: number;
  text: string;
  done: false;
  createAt: string;
  userId: number;
};

export const addTodo = (data: TodoType) => {
  return post("/todos", data);
};

export const editTodo = (id: string, data: { text: string }) => {
  return patch(`/todos/${id}`, data);
};

export const deleteTodo = (id: string) => {
  return delete_(`/todos/${id}`);
};
