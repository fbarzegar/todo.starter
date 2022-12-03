import { get, post } from ".";

export type userType = {
  id: 1;
  username: string;
  password: string;
};

export const login = (data: { username: string; password: string }) => {
  return post<{ user: userType }>("/api/login", data);
};

export const register = (data: { username: string; password: string }) => {
  return post<{ user: userType }>("/api/signup", data);
};

export const getMe = () => {
  return get("/api/me");
};
