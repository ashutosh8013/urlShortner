import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext({});
export function UserContextProvider({children}){
    const [user,setUser]=useState(null);
    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data);
                console.log("in context");
            })
        }
    },[])
    return (
        <UserContext.Provider value={{user,setUser}}>
            {
                console.log("in body of context")
            }
                {children}
            
        </UserContext.Provider>
    )
}
