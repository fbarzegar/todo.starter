import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkUsername } from "../api/user";

export function useQuery() {
  const router = useRouter();

  return router.query;
}

export const useCheckUsername = (username?: string) => {
  const [usernameStatus, setUsernameStatus] = useState<"checking" | "idle" | "exist" | "open" | "error">("idle");

  useEffect(() => {
    const handleCheckUsername = async () => {
      try {
        if (username && username.trim() !== "") {
          setUsernameStatus("checking");
          const res = await checkUsername(username);
          if (res?.user) {
            setUsernameStatus("open");
          } else {
            setUsernameStatus("exist");
          }
        }
      } catch (error) {
        setUsernameStatus("error");
        console.log(error);
      }
    };
    const t = setTimeout(() => handleCheckUsername(), 250);

    return () => clearTimeout(t);
  }, [username]);
  
  return { usernameStatus };
};
