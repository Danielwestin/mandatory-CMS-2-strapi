import { useEffect, useState } from "react";
import NotificationContext from "../../contexts/notification";
import styles from "./Notification.module.css";

export default function NotificationProvider({ children }) {
  const [notification, notify] = useState();

  useEffect(() => {
    if (notification) {
      setTimeout(() => notify(), 2000);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {notification && (
        <p className={styles[notification.type]}>{notification.content}</p>
      )}
    </NotificationContext.Provider>
  );
}
