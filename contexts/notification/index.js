import { createContext, useContext } from "react";

const NotificationContext = createContext();

export function useNotify() {
  return useContext(NotificationContext);
}

export default NotificationContext;
