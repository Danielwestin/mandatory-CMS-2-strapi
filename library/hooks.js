import { useEffect, useState } from "react";

export function useLocalStorage(key, fallbackValue) {
  const [storage, setStorage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue) {
        return JSON.parse(storedValue);
      }
    }

    return fallbackValue;
  });

  useEffect(() => {
    if (storage) window.localStorage.setItem(key, JSON.stringify(storage));
    else window.localStorage.removeItem(key);
  }, [storage]);

  return [storage, setStorage];
}
