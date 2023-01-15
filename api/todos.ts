import { delete_, post } from ".";

export type TodoType = {
  _id: number;
  text: string;
  done: false;
  createAt: string;
  userId: number;
};

export const addTodo = () => {
  return post("/todos");
};

export const editTodo = () => {
  return post("/todos");
};

export const deleteTodo = () => {
  return delete_("/todos");
};
