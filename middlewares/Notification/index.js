import { useEffect, useState } from "react";
import NotificationContext from "../../contexts/notification";
import styles from "./Notification.module.css";
import Confetti from "react-confetti";

export default function NotificationMiddleware({ children }) {
  const [notification, notify] = useState();

  useEffect(() => {
    if (notification) {
      setTimeout(() => notify(), 5000);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {notification && (
        <p className={styles[notification.type] + " " + styles.default}>
          {notification.content}
        </p>
      )}
      {notification?.type === "success" && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={450}
        />
      )}
    </NotificationContext.Provider>
  );
}
