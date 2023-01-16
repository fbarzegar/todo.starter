import { get, post } from ".";

export type UserType = {
  id: number;
  username: string;
  password: string;
  createdAt: number | string;
};

export const register = (username: string, password: string) => {
  return post<{ user: UserType; token: number }>("/signup", { username, password });
};

export const login = (username: string, password: string) => {
  return post<{ user: UserType; token: number }>("/login", { username, password });
};

export const getMe = () => {
  return get<UserType>("/me");
};
