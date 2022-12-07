import Axios from "axios";
import { getToken, removeToken, tokenkey } from "./token";

export const BaseUrl = "http://localhost:3000/api";
// export const WebsocketUrl = "http://localhost:3000/api";

export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (!config.headers.Athurization && token) {
      config.headers.Athurization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.respanse.status === 401) {
      removeToken();
    }

    return Promise.reject(error);
  }
);
