import { createContext,useContext, useEffect, useState } from "react";
import API from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem("token"));

    // fetch user profile on load if token exists
    useEffect(()=>{
        if(token){
            API.get("/auth/profile", {
                headers:{Authorization: `Bearer ${token}`},
            })
            .then(res => setUser(res.data.user))
            .catch(()=>{
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            });
        }
    },[token]);
    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token" ,token);
    }
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    }
    return(
        <AuthContext.Provider value={{user,token, login, logout}}>
            {children}
        </AuthContext.Provider>



    );
};
// Custom hook to use context easily
export const useAuth = () => useContext(AuthContext)