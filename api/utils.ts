import { AxiosResponse } from "axios";
import { Error } from "./Error";

export function onSuccess<T>(response: AxiosResponse<T>) {
  return response.data;
}

export function onError(error: any) {
  const errorObject = new Error(error.response || error.message, new Date().toISOString());
  console.error("Request Failed:", errorObject);

  return Promise.reject(errorObject);
}
