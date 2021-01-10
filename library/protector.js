import { useRouter } from "next/router";
import { useUser } from "../contexts/user";

export default function Protect({ children }) {
  const router = useRouter();
  const user = useUser();

  if (!user) {
    router.push("/");
    return null;
  }

  return children;
}
