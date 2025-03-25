import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedExpiration = localStorage.getItem("expiration");

    if (storedUser && storedExpiration) {
      const currentTime = new Date().getTime();

      if (currentTime > storedExpiration) {
        localStorage.removeItem("user");
        localStorage.removeItem("expiration");
        setUser(null);
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return { user, setUser };
};
