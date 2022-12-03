import Cookie from "js-cookie";

export const tokenkey = "token";

export function setToken(token: string) {
  Cookie.set(tokenkey, token, { expires: 7 });
}

export function removeToken() {
  Cookie.remove(tokenkey);
}

export function getToken() {
  return Cookie.get(tokenkey);
}
