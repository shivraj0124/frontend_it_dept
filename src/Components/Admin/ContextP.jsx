import React, { createContext, useContext, useState, useEffect } from "react";
const ContextP = createContext();
import axios from 'axios'
export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem("username") ? localStorage.getItem("username") : "")
    const [userId, setUserId] = useState(localStorage.getItem("userId") ? localStorage.getItem("userId") : "")
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("username") ? true : false)
    const [auth, setAuth] = useState(localStorage.getItem("auth") ? { user: JSON.parse(localStorage.getItem("auth")) } : { user: null })
    const [studentDetails,setStudentDetails]=useState()
    const [findForm, setFindForm] = useState('S')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const value = {
        username,
        setUsername,
        loggedIn,
        setLoggedIn,
        userId,
        setUserId,
        auth,
        setAuth,
        findForm,
        setFindForm,
        studentDetails,
        setStudentDetails
    }
    const getStudentDetails =async  (studentId) => {
        console.log(studentId)
        
        await axios.get(`${urlBackend}/api/v2/get-student-details/${studentId}`)
            .then((response) => {
                if (response.data.success) {
                    setStudentDetails(response.data.student);
                    
                    // console.log(semesterId);
                    console.log(response.data.student);
                    
                } else {
                    alert(response.data.error);
                    
                }
            })
            .catch((error) => {
                console.log(error);

            });
    }
    useEffect(() => {
        console.log(userId);
        // console.log(JSON.parse(data));
        // if (data) {
        //     const parseData = JSON.parse(data);
        //     setAuth({
        //         ...auth,
        //         user: parseData
        //     });
        //     console.log(auth);
        // }
        if(auth?.user?.role === 1){
           getStudentDetails(userId)
        }
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