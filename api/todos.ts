export type todosType = {
  id: number;
  text: string;
  done: boolean;
  createAt: string;
  userId: number;
};

export type commentType = {
  id: number;
  text: string;
  createAt: string;
  todoId: number;
};
