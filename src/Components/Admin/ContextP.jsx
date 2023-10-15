import React, { createContext, useContext, useState,useEffect } from "react";
const ContextP = createContext();

export const UserProvider = ({ children }) => {    
    const [username, setUsername] = useState(localStorage.getItem("username") ? localStorage.getItem("username") :"")
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("username") ? true : false)
    const [auth, setAuth] = useState(localStorage.getItem("auth") ? {user:JSON.parse(localStorage.getItem("auth"))}:{user:null})
    const [findForm, setFindForm] = useState('')
    const value = {      
        username,
        setUsername,
        loggedIn,
        setLoggedIn ,
        auth,
        setAuth,
        findForm,
        setFindForm    
    }
    useEffect(() => {
        console.log(auth);
        // console.log(JSON.parse(data));
        // if (data) {
        //     const parseData = JSON.parse(data);
        //     setAuth({
        //         ...auth,
        //         user: parseData
        //     });
        //     console.log(auth);
        // }
        
    }, []);
    return <ContextP.Provider value={value}>
        {children}
    </ContextP.Provider>
}

const themeHook = () => {
    const context = useContext(ContextP);
    return context
}

export default themeHook