import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      if (sessionStorage.getItem("token")) {
        axios
          .post("/profile", {
            token: sessionStorage.getItem("token"),
          })
          .then(({ data }) => {
            setUser(data);
            console.log("in context");
          });
      } else if (sessionStorage.getItem("googleToken")) {
        axios
          .post("/profile", {
            googleToken: sessionStorage.getItem("googleToken"),
          })
          .then(({ data }) => {
            setUser(data);
            console.log("in context");
          });
      }
    }
  }, []);
// this useContext will help me to get the username all over the frontend 
// i am using user and setuser all over the frontend 
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {console.log("in body of context")}
      {children}
    </UserContext.Provider>
  );
}
