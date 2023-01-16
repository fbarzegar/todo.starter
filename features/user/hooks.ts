import { UserType } from "../../api/user";
import { useAppSelector } from "../../store";

// export function useUser() {
//   return useAppSelector((s) => s.user.user);
// }

// export function useUserStatus() {
//   return useAppSelector((s) => s.user.status);
// }

export const selectUser = (state: any) => state.user;

export const useUser = () => {
  const user = useAppSelector(selectUser);

  return user.user ? (user.user as UserType) : null;
};
