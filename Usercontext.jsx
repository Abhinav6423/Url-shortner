import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const Datacontext = createContext();

const Usercontext = ({ children }) => {

    const [userInfo, setUserInfo] = useState({})

    const fetchUserInfo = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/user", {
                withCredentials: true
            })

            setUserInfo(res.data.user)
        } catch (err) {
            console.log("User fetch failed", err.message)
            setUserInfo({})
        }
    }



    useEffect(() => {


        fetchUserInfo();
    }, [])

    return (
        <div>

            <Datacontext.Provider value={{ userInfo, setUserInfo, fetchUserInfo }}>
                {children}
            </Datacontext.Provider>

        </div>
    )
}

export default Usercontext