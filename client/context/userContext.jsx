import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      if (sessionStorage.getItem("token")) {
        axios
          .get("/profile", {
            token: sessionStorage.getItem("token"),
          })
          .then(({ data }) => {
            setUser(data);
            console.log("in context");
          });
      } else if (sessionStorage.getItem("googleToken")) {
        axios
          .get("/profile", {
            googleToken: sessionStorage("googleToken"),
          })
          .then(({ data }) => {
            setUser(data);
            console.log("in context");
          });
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {console.log("in body of context")}
      {children}
    </UserContext.Provider>
  );
}
