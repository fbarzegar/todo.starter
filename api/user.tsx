import { get, post } from ".";

export type userType = {
  id: number;
  username: string;
  password: string;
};

export const login = (data: { username: string; password: string }) => {
  return post<{ user: userType; message: string; token: number }>("/login", data);
};

export const register = (data: { username: string; password: string }) => {
  return post<{ message: string; token: number; user: userType }>("/signup", data);
};

export const getMe = async () => {
  return get<{ user: userType }>("/me");
};

export const checkUsername = (username: string) => {
  return get(`/username/check?username=${username}`);
};
