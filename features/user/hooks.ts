import { useAppSelector } from "../../store";

export function useUser() {
  return useAppSelector((s) => s.user.user);
}

export function useUserStatus() {
  return useAppSelector((s) => s.user.status);
}
