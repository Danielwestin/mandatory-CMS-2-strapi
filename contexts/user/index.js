import { createContext, useContext, useState } from "react";
import Fetch from "../../library/fetch";

const UserContext = createContext();

export function useLoginUser() {
  return useContext(UserContext).setUser;
}

export function useLogoutUser() {
  const setUser = useContext(UserContext).setUser;
  return () => {
    Fetch.token = "";
    setUser(undefined);
  };
}

export function useUser() {
  return useContext(UserContext).user;
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
